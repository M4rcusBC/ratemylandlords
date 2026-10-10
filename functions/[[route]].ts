import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handle } from "hono/cloudflare-pages";
import { drizzle } from "drizzle-orm/d1";
import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";
import type { D1Database } from "@cloudflare/workers-types";
import { landlords, reviews, users, sessions } from "../db/schema";

type Bindings = {
  DB: D1Database;
  HEXCLAVE_API_URL?: string;
  HEXCLAVE_PROJECT_ID?: string;
  HEXCLAVE_PUBLISHABLE_KEY?: string;
  HEXCLAVE_SECRET_KEY?: string;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

// Middleware
app.use("*", cors());
app.use("*", logger((message, ...rest) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [CF-Pages-API] ${message}`, ...rest);
}));

// Global error handler
app.onError((err, c) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] [CF-Pages-ERROR] ${c.req.method} ${c.req.url} -`, err.message || err);
  return c.json(
    {
      error: err.message || "Internal Server Error",
      timestamp: Date.now(),
    },
    500
  );
});

const landlordInput = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Landlord name must be at least 2 characters")
    .max(120, "Landlord name must be at most 120 characters"),
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(80, "City must be at most 80 characters"),
  state: z
    .string()
    .trim()
    .min(2, "State must be at least 2 characters")
    .max(40, "State must be at most 40 characters"),
  address: z.string().trim().max(200).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

const reviewInput = z.object({
  landlordId: z.string().min(1, "Landlord ID is required"),
  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .trim()
    .min(10, "Review comment must be at least 10 characters")
    .max(2000, "Review comment must be under 2000 characters"),
  tags: z
    .array(z.string().trim().max(40))
    .max(10, "You can select up to 10 tags")
    .default([]),
});

const parseTags = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: Date.now() });
});

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder().encode(password + "_hexclave_salt");
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

app.post("/auth/sign-up", async (c) => {
  const body = (await c.req.json().catch(() => null)) as {
    email?: string;
    password?: string;
    displayName?: string;
  } | null;

  const email = body?.email?.trim().toLowerCase();
  const password = body?.password || "";
  const displayName = body?.displayName?.trim() || email?.split("@")[0] || "User";

  if (!email || !email.includes("@")) {
    return c.json({ error: "Valid email address is required" }, 400);
  }
  if (!password || password.length < 6) {
    return c.json({ error: "Password must be at least 6 characters" }, 400);
  }

  const hexclaveUrl = c.env.HEXCLAVE_API_URL || "https://api.hexclave.com";
  const hexclaveProjectId = c.env.HEXCLAVE_PROJECT_ID || "";
  const hexclavePub = c.env.HEXCLAVE_PUBLISHABLE_KEY || "";
  const hexclaveSec = c.env.HEXCLAVE_SECRET_KEY || "";

  let hexclaveUserId: string | null = null;
  if (hexclaveProjectId) {
    try {
      const res = await fetch(`${hexclaveUrl}/api/v1/auth/password/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Stack-Project-Id": hexclaveProjectId,
          "X-Stack-Publishable-Client-Key": hexclavePub,
          ...(hexclaveSec ? { "X-Stack-Secret-Server-Key": hexclaveSec } : {}),
        },
        body: JSON.stringify({ email, password, display_name: displayName }),
      });
      if (res.ok) {
        const hexData = (await res.json().catch(() => null)) as { user?: { id?: string }; id?: string } | null;
        hexclaveUserId = hexData?.user?.id || hexData?.id || null;
      }
    } catch (e) {
      console.warn("Hexclave upstream signup warning:", e);
    }
  }

  const db = drizzle(c.env.DB);
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    return c.json({ error: "An account with this email already exists" }, 409);
  }

  const userId = hexclaveUserId || crypto.randomUUID();
  const passwordHash = await hashPassword(password);
  const newUser = {
    id: userId,
    email,
    displayName,
    passwordHash,
    hexclaveUserId: hexclaveUserId || userId,
    createdAt: Date.now(),
  };

  await db.insert(users).values(newUser);

  const token = "hex_" + crypto.randomUUID().replace(/-/g, "");
  await db.insert(sessions).values({
    id: crypto.randomUUID(),
    userId: newUser.id,
    token,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    createdAt: Date.now(),
  });

  return c.json(
    {
      user: {
        id: newUser.id,
        email: newUser.email,
        displayName: newUser.displayName,
      },
      token,
    },
    201
  );
});

app.post("/auth/sign-in", async (c) => {
  const body = (await c.req.json().catch(() => null)) as {
    email?: string;
    password?: string;
  } | null;

  const email = body?.email?.trim().toLowerCase();
  const password = body?.password || "";

  if (!email || !password) {
    return c.json({ error: "Email and password are required" }, 400);
  }

  const hexclaveUrl = c.env.HEXCLAVE_API_URL || "https://api.hexclave.com";
  const hexclaveProjectId = c.env.HEXCLAVE_PROJECT_ID || "";
  const hexclavePub = c.env.HEXCLAVE_PUBLISHABLE_KEY || "";

  let authenticatedUser: { id: string; email: string; displayName: string } | null = null;

  if (hexclaveProjectId) {
    try {
      const res = await fetch(`${hexclaveUrl}/api/v1/auth/password/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Stack-Project-Id": hexclaveProjectId,
          "X-Stack-Publishable-Client-Key": hexclavePub,
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const hexData = (await res.json().catch(() => null)) as {
          user?: { id: string; primary_email?: string; email?: string; display_name?: string };
        } | null;
        if (hexData?.user) {
          authenticatedUser = {
            id: hexData.user.id,
            email: hexData.user.primary_email || hexData.user.email || email,
            displayName: hexData.user.display_name || email.split("@")[0],
          };
        }
      }
    } catch (e) {
      console.warn("Hexclave upstream signin warning:", e);
    }
  }

  const db = drizzle(c.env.DB);
  if (!authenticatedUser) {
    const passwordHash = await hashPassword(password);
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user && user.passwordHash === passwordHash) {
      authenticatedUser = {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      };
    }
  }

  if (!authenticatedUser) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const token = "hex_" + crypto.randomUUID().replace(/-/g, "");
  await db.insert(sessions).values({
    id: crypto.randomUUID(),
    userId: authenticatedUser.id,
    token,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    createdAt: Date.now(),
  });

  return c.json({
    user: authenticatedUser,
    token,
  });
});

app.get("/auth/me", async (c) => {
  const authHeader = c.req.header("Authorization") || c.req.header("x-hexclave-access-token");
  const token = authHeader?.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const db = drizzle(c.env.DB);
  const [session] = await db
    .select({
      userId: sessions.userId,
      email: users.email,
      displayName: users.displayName,
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.token, token), sql`${sessions.expiresAt} > ${Date.now()}`))
    .limit(1);

  if (!session) {
    return c.json({ error: "Invalid or expired session" }, 401);
  }

  return c.json({
    user: {
      id: session.userId,
      email: session.email,
      displayName: session.displayName,
    },
  });
});

app.post("/auth/sign-out", async (c) => {
  const authHeader = c.req.header("Authorization") || c.req.header("x-hexclave-access-token");
  const token = authHeader?.replace(/^Bearer\s+/i, "").trim();
  if (token) {
    const db = drizzle(c.env.DB);
    await db.delete(sessions).where(eq(sessions.token, token));
  }
  return c.json({ success: true });
});

app.get("/landlords", async (c) => {
  const db = drizzle(c.env.DB);
  const search = c.req.query("search")?.trim();
  const city = c.req.query("city")?.trim();
  const state = c.req.query("state")?.trim();

  const conditions = [];

  if (search) {
    conditions.push(
      or(
        like(landlords.name, `%${search}%`),
        like(landlords.city, `%${search}%`),
        like(landlords.state, `%${search}%`)
      )
    );
  }

  if (city) {
    conditions.push(like(landlords.city, `%${city}%`));
  }

  if (state) {
    conditions.push(like(landlords.state, `%${state}%`));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const rows = await db
    .select({
      id: landlords.id,
      name: landlords.name,
      city: landlords.city,
      state: landlords.state,
      address: landlords.address,
      latitude: landlords.latitude,
      longitude: landlords.longitude,
      createdAt: landlords.createdAt,
      avgRating: sql<number>`coalesce(avg(${reviews.rating}), 0)`,
      reviewCount: sql<number>`count(${reviews.id})`,
    })
    .from(landlords)
    .leftJoin(reviews, eq(landlords.id, reviews.landlordId))
    .where(whereClause)
    .groupBy(landlords.id)
    .orderBy(desc(landlords.createdAt));

  return c.json({
    landlords: rows.map((row) => ({
      id: row.id,
      name: row.name,
      city: row.city,
      state: row.state,
      address: row.address,
      latitude: row.latitude,
      longitude: row.longitude,
      createdAt: Number(row.createdAt),
      avgRating: Math.round(Number(row.avgRating) * 10) / 10,
      reviewCount: Number(row.reviewCount),
    })),
  });
});

app.post("/landlords", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = landlordInput.safeParse(body);
  if (!parsed.success) {
    return c.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid landlord data" },
      400
    );
  }

  const db = drizzle(c.env.DB);
  const newLandlord = {
    id: crypto.randomUUID(),
    name: parsed.data.name,
    city: parsed.data.city,
    state: parsed.data.state,
    address: parsed.data.address ?? null,
    latitude: parsed.data.latitude ?? null,
    longitude: parsed.data.longitude ?? null,
    createdAt: Date.now(),
  };

  await db.insert(landlords).values(newLandlord);

  return c.json(
    {
      ...newLandlord,
      avgRating: 0,
      reviewCount: 0,
    },
    201
  );
});

app.get("/landlords/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = c.req.param("id");

  const [landlord] = await db
    .select({
      id: landlords.id,
      name: landlords.name,
      city: landlords.city,
      state: landlords.state,
      address: landlords.address,
      latitude: landlords.latitude,
      longitude: landlords.longitude,
      createdAt: landlords.createdAt,
      avgRating: sql<number>`coalesce(avg(${reviews.rating}), 0)`,
      reviewCount: sql<number>`count(${reviews.id})`,
    })
    .from(landlords)
    .leftJoin(reviews, eq(landlords.id, reviews.landlordId))
    .where(eq(landlords.id, id))
    .groupBy(landlords.id);

  if (!landlord) {
    return c.json({ error: "Landlord not found" }, 404);
  }

  const reviewRows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.landlordId, id))
    .orderBy(desc(reviews.createdAt));

  // Compute score breakdown (counts of 1 to 5 star ratings)
  const scoreBreakdown: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  const tagCounts: Record<string, number> = {};

  const shapedReviews = reviewRows.map((review) => {
    const rating = Math.min(5, Math.max(1, Number(review.rating)));
    scoreBreakdown[rating] = (scoreBreakdown[rating] || 0) + 1;

    const reviewTags = parseTags(review.tags);
    reviewTags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });

    return {
      id: review.id,
      landlordId: review.landlordId,
      rating,
      comment: review.comment,
      tags: reviewTags,
      createdAt: Number(review.createdAt),
    };
  });

  return c.json({
    id: landlord.id,
    name: landlord.name,
    city: landlord.city,
    state: landlord.state,
    address: landlord.address,
    latitude: landlord.latitude,
    longitude: landlord.longitude,
    createdAt: Number(landlord.createdAt),
    avgRating: Math.round(Number(landlord.avgRating) * 10) / 10,
    reviewCount: Number(landlord.reviewCount),
    scoreBreakdown,
    tagCounts,
    reviews: shapedReviews,
  });
});

app.post("/reviews", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = reviewInput.safeParse(body);
  if (!parsed.success) {
    return c.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid review data" },
      400
    );
  }

  const db = drizzle(c.env.DB);

  // Check if landlord exists
  const [existing] = await db
    .select({ id: landlords.id })
    .from(landlords)
    .where(eq(landlords.id, parsed.data.landlordId))
    .limit(1);

  if (!existing) {
    return c.json({ error: "Landlord not found" }, 404);
  }

  const newReview = {
    id: crypto.randomUUID(),
    landlordId: parsed.data.landlordId,
    rating: parsed.data.rating,
    comment: parsed.data.comment,
    tags: JSON.stringify(parsed.data.tags),
    createdAt: Date.now(),
  };

  await db.insert(reviews).values(newReview);

  return c.json(
    {
      id: newReview.id,
      landlordId: newReview.landlordId,
      rating: newReview.rating,
      comment: newReview.comment,
      tags: parsed.data.tags,
      createdAt: newReview.createdAt,
    },
    201
  );
});

const handleHono = handle(app);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  // If not an API request, pass through to Cloudflare Pages static asset handler
  if (!url.pathname.startsWith("/api")) {
    return context.next();
  }
  return handleHono(context);
};

