# Rate My Landlords 🏢⭐

An independent, tenant-driven platform built to bring transparency and accountability to rental housing. Check landlord ratings, inspect score breakdowns, explore properties on an interactive OpenStreetMap view, and submit anonymous reviews.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons, React Router 7
- **Mapping**: Client-side [OpenStreetMap](https://www.openstreetmap.org/) via [Leaflet](https://leafletjs.com/)
- **Backend / Edge**: [Hono](https://hono.dev/) universal API routing
- **Database & ORM**: Cloudflare D1 (Serverless SQLite) & Local/VPS SQLite via [Drizzle ORM](https://orm.drizzle.team/)
- **Validation**: [Zod](https://zod.dev/)
- **Auth**: Hexclave / Stack Auth configuration support

---

## 📁 Project Structure

```text
/
├── src/                   # React 19 Vite Frontend
│   ├── components/        # Navbar, Footer, StarRating, ScoreBreakdown, LandlordMap, etc.
│   ├── pages/             # HomePage, DirectoryPage, LandlordProfilePage, AddLandlordPage, AddReviewPage
│   ├── lib/               # Typed API client, types, coordinates, and auth bridge
│   ├── App.tsx            # React Router setup
│   └── main.tsx           # React DOM mount
├── functions/             # Cloudflare Pages Functions
│   └── [[route]].ts       # Catch-all Hono API router for Cloudflare Pages
├── server.ts              # Standalone Node.js/Docker Hono server for VPS deployment
├── db/                    # Drizzle ORM schema & migrations
│   ├── schema.ts          # Database schema (landlords, reviews)
│   └── migrations/        # SQL migration files
├── scripts/               # Seeding scripts (Cloudflare D1 & VPS SQLite)
│   ├── seed-real-landlords.sql
│   ├── seed-d1.ts
│   └── seed-vps.ts
├── Dockerfile             # Multi-stage production container for VPS
├── docker-compose.yml     # Compose file with persistent storage & optional Caddy proxy
├── Caddyfile              # Automatic SSL reverse proxy config for VPS
├── DEPLOYMENT.md          # Comprehensive VPS + Cloudflare Pages deployment guide
├── wrangler.toml          # Cloudflare Pages and D1 database configuration
└── vite.config.ts         # Vite build configuration with chunk splitting
```

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Run Vite Frontend
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Standalone Backend Server (for VPS or Local API Testing)
```bash
# Seed local SQLite database with real landlords
npm run db:seed:vps

# Start Hono API server on port 3001
npm run start:vps
```

### 4. Run Cloudflare Pages Locally (with D1)
```bash
# Apply migrations to local D1 instance
npm run db:migrate

# Seed local D1 database
npm run db:seed

# Preview build with Wrangler
npx wrangler pages dev dist
```

---

## 🚢 Deployment Architecture

This project supports two primary deployment topologies:

### Architecture 1: Hybrid (12GB VPS Backend + Cloudflare Pages Frontend)
- **Frontend**: Hosted on **Cloudflare Pages** (`dist/`) on the global edge CDN with free SSL and zero load on your VPS.
- **Backend**: Hosted on your **12GB Linux VPS** running `server.ts` via Docker or PM2, with SQLite in high-performance WAL mode and automatic Let's Encrypt SSL via Caddy.
- 👉 **Read the full step-by-step guide in [DEPLOYMENT.md](./DEPLOYMENT.md)**.

### Architecture 2: 100% Native Cloudflare Pages (Serverless)
- Deploy frontend and backend together on Cloudflare Pages using Pages Functions (`functions/[[route]].ts`) and Cloudflare D1.

---

## 🧪 Verification & Build

```bash
# Type check & lint
npm run lint

# Build production frontend assets
npm run build
```

---

## 📄 License
MIT
