import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handle } from "hono/cloudflare-pages";
import { drizzle } from "drizzle-orm/d1";
import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";
import type { D1Database } from "@cloudflare/workers-types";
import { landlords, reviews } from "../db/schema";

type Bindings = {
  DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
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
  
  const token = body?.turnstileToken;
  if (!token) {
    return c.json({ error: "Missing Turnstile token" }, 400);
  }

  // Verify the token with Cloudflare
  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${c.env.TURNSTILE_SECRET_KEY}&response=${token}`
  });
  
  const verifyData = await verifyRes.json() as any;
  if (!verifyData.success) {
    return c.json({ error: "Invalid Turnstile token" }, 400);
  }

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

  const token = body?.turnstileToken;
  if (!token) {
    return c.json({ error: "Missing Turnstile token" }, 400);
  }

  // Verify the token with Cloudflare
  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${c.env.TURNSTILE_SECRET_KEY}&response=${token}`
  });
  
  const verifyData = await verifyRes.json() as any;
  if (!verifyData.success) {
    return c.json({ error: "Invalid Turnstile token" }, 400);
  }

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

