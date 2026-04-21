# FitFam

FitFam is a family wellness app that helps households plan meals, manage recipes, and coordinate fitness activities together. A weekly meal planner generates a shopping list automatically, a shared recipe book keeps everyone's favourites in one place, and an activity planner (coming in v3) brings food and fitness into a single view. The app ships as a **Next.js web app** and an **Expo mobile app**, both backed by the same API.

---

## Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| [Bun](https://bun.sh) | ≥ 1.1 |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | any recent |
| [Node.js](https://nodejs.org) | ≥ 20 (required by some Expo tooling) |

You will also need accounts for:

- **[Clerk](https://clerk.com)** — authentication (free dev plan is enough)
- **[Neon](https://neon.tech)** — PostgreSQL database (only needed for production; local dev uses Docker)

### 1. Clone and install

```bash
git clone https://github.com/your-org/fit-fam.git
cd fit-fam
bun install
```

### 2. Set up environment variables

```bash
cp .env.example apps/web/.env.local
```

Open `apps/web/.env.local` and fill in the required values:

```env
# Local Docker PostgreSQL (no Neon needed for local dev)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fitfam

# From your Clerk dashboard → API Keys
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# UploadThing is not required locally — MinIO is used instead
UPLOADTHING_TOKEN=
```

For the mobile app create `apps/mobile/.env.local`:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### 3. Start local services

```bash
docker compose up -d
```

This starts:

| Service | URL |
|---|---|
| PostgreSQL | `localhost:5432` |
| MinIO (S3-compatible storage) | `localhost:9000` |
| MinIO console | `localhost:9001` |

### 4. Run database migrations

```bash
bun nx run db:migrate
```

### 5. Start the web app

```bash
bun nx dev web
# → http://localhost:3000
```

### 6. Start the mobile app (optional)

```bash
bun nx start mobile
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with the Expo Go app.

---

## Repo Structure

```
fit-fam/
├── apps/
│   ├── web/          # Next.js web app (App Router, shadcn/ui, Tailwind CSS)
│   └── mobile/       # Expo / React Native mobile app
├── libs/
│   ├── api/          # Business logic — consumed by Next.js API route handlers
│   ├── db/           # Drizzle ORM schema, migrations, and database client
│   ├── types/        # Shared TypeScript interfaces and DTOs
│   └── i18n/         # Shared translation strings (English + Polish)
├── docs/             # Architecture, feature specs, entity definitions, roadmap
├── docker-compose.yml
├── nx.json
└── package.json
```

All packages are managed as a **Bun workspace**. Nx orchestrates builds, tests, and task dependencies across apps and libs.

### Common commands

```bash
# Development
bun nx dev web                  # Start web dev server
bun nx start mobile             # Start Expo dev server

# Building
bun nx build web                # Production build (web)

# Quality
bun nx run-many -t typecheck    # Type-check all projects
bun run lint                    # Biome lint + format check

# Testing
bun nx run-many -t test         # Run all test suites
bun nx test web                 # Run web tests only
```

---

## Further Reading

| Document | Description |
|---|---|
| [Architecture](docs/ARCHITECTURE.md) | Tech stack, data flow diagrams, auth flow, infra overview |
| [Features](docs/FEATURES.md) | Full feature list with version and implementation status |
| [Roadmap](docs/ROADMAP.md) | Release plan — v1 MVP through v5 and beyond |
| [Entities](docs/ENTITIES.md) | Domain model, user roles, and data relationships |
