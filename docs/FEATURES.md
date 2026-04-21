# FitFam — Features

Status legend: `implemented` · `planned` · `future`

---

## Family Management

| Feature | Status | Version | Notes |
|---|---|---|---|
| Create a family group | planned | v1 | Owner account created on sign-up |
| Add unregistered member profiles | planned | v1 | Name, age, dietary notes; no login required |
| Invite adults via email | planned | v1 | Clerk-powered email invitation |
| Family-level language setting | planned | v1 | English and Polish at launch |
| Member roles (Owner / Adult / Child profile) | planned | v1 | See ENTITIES.md for role definitions |
| Child login with parental consent | planned | v5 | COPPA-compliant flow |
| Per-user language override | planned | v5 | Overrides the family-level setting |

---

## Recipe Book

| Feature | Status | Version | Notes |
|---|---|---|---|
| Create / edit / delete recipes | planned | v1 | Name, description, base servings, photo |
| Recipe ingredient list | planned | v1 | Quantity + unit per ingredient |
| Family ingredient library | planned | v1 | Reusable ingredients with category |
| Recipe photo upload | planned | v1 | UploadThing / MinIO |
| Ingredient scaling preview | planned | v1 | View scaled quantities for N servings |
| Recipe share-by-link (read-only URL) | planned | v2 | Public read-only link, no account needed |
| Recipe import from URL | planned | v2 | AI-powered; premium feature |
| Recipe import from image/photo | planned | v2 | AI-powered; premium feature |
| Nutritional data per recipe | planned | v2 | Calories, macros via AI or food database |
| Community recipe library | future | — | Browse and import from other families |
| Ingredient internationalization | future | — | Multi-language ingredient names |

---

## Meal Planning

| Feature | Status | Version | Notes |
|---|---|---|---|
| Weekly meal plan view | planned | v1 | Calendar-style layout |
| Next-week preview | planned | v1 | Plan ahead while viewing current week |
| Configurable meal slots | planned | v1 | Name + time window; ordered per family |
| Multiple dishes per slot | planned | v1 | |
| Dish assigned to all or subset of members | planned | v1 | Dish-level assignment |
| Per-member portion count | planned | v1 | Used for shopping list scaling |
| Batch cooking: dish across a date range | planned | v1 | One entry, spans Mon–Wed etc. |
| Copy / template a previous week | planned | v2 | Use last week as starting point |
| AI meal plan generation | planned | v2 | Suggest a week based on preferences/goals |
| Monthly overview (read-only) | future | — | High-level calendar view |

---

## Shopping List

| Feature | Status | Version | Notes |
|---|---|---|---|
| Auto-generate from weekly meal plan | planned | v1 | Triggered on demand |
| Ingredient aggregation across meals/days | planned | v1 | Summed by ingredient |
| Grouped by ingredient category | planned | v1 | |
| Manual item additions (freeform) | planned | v1 | Non-recipe items |
| Check-off items while shopping | planned | v1 | Mobile primary use case |
| Offline shopping list (mobile) | planned | v1 | AsyncStorage persistence |
| Offline check-off sync on reconnect | planned | v1 | TanStack Query mutation queue |
| Home inventory / waste tracking | future | — | Carry-over unused ingredients |

---

## Activity Planning

| Feature | Status | Version | Notes |
|---|---|---|---|
| Individual training plan (gym, running, cycling) | planned | v3 | Per-member schedule |
| Family group activity planning (walk, bike trip) | planned | v3 | Shared activities |
| Combined weekly view (meals + activities) | planned | v3 | Single planner for both |
| Activity completion logging | planned | v3 | Planned vs. actual tracking |
| Activity history per member | planned | v3 | |

---

## AI Features

| Feature | Status | Version | Notes |
|---|---|---|---|
| AI meal plan generation | planned | v2 | Vercel AI SDK; paid |
| AI recipe assistant | planned | v2 | Help create or vary recipes; paid |
| Recipe import from URL | planned | v2 | AI parsing; premium |
| Recipe import from image | planned | v2 | AI parsing; premium |
| Nutritional analysis | planned | v2 | Calories + macros; AI or food API |
| AI training advisor | planned | v4 | Suggest training plans; paid |
| Family habit recognition | planned | v4 | Identify patterns in activity history |
| Personalized health recommendations | planned | v4 | Align food + training with goals |
| Gym equipment suggestions and substitutions | planned | v4 | |

---

## Notifications

| Feature | Status | Version | Notes |
|---|---|---|---|
| Push notifications (mobile) | planned | v2 | Shopping list updates, plan ready |
| In-app notification feed | future | — | |

---

## Billing & Subscription

| Feature | Status | Version | Notes |
|---|---|---|---|
| Free tier (core features) | planned | v1 | Meal planning, recipes, shopping list |
| Paid tier (AI + premium features) | planned | v2 | Stripe; introduced alongside first AI features |
| Subscription management | planned | v2 | Upgrade, downgrade, cancel |

---

## Platform & Infrastructure

| Feature | Status | Version | Notes |
|---|---|---|---|
| Web app (Next.js) | planned | v1 | |
| Mobile app (Expo / React Native) | planned | v1 | iOS and Android |
| Offline shopping list (mobile) | planned | v1 | |
| Docker Compose local dev environment | planned | v1 | PostgreSQL + MinIO |
| English + Polish localization | planned | v1 | Family-level language setting |
| Additional languages | future | — | |
