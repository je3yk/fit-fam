# FitFam — Product Requirements Document

## Problem Statement

Maintaining a healthy diet and exercise routine is hard when family members follow different schedules, dietary needs, and fitness goals. Off-the-shelf diet and training apps are individual-focused — they don't account for the shared meals families cook together, the group activities they enjoy, or the coordination required to manage a household's nutrition and fitness as a unit. Families end up either abandoning individual health goals to eat together, or fragmenting into separate routines that erode shared time.

## Solution

FitFam is a full-stack family wellness planner (web + mobile) that allows families to coordinate diet and activity planning across all members — handling both shared and individual needs in a single place. It supports:

- A family recipe book with ingredient-aware scaling
- A weekly meal plan that distinguishes shared and individual dishes, handles batch cooking across multiple days, and auto-generates a shopping list
- A family activity planner for both individual and group exercises
- An AI layer (added progressively) to assist with meal planning, training advice, and content generation
- A mobile app with offline-capable shopping list for real-world use

The app is designed so that one person can manage the whole family, while others can optionally have their own accounts with appropriate access levels.

---

## User Stories

### Family & Account Management

1. As a family owner, I want to create a family group, so that I can manage my household's diet and activities in one place.
2. As a family owner, I want to add family members as profiles (without requiring them to have an account), so that I can manage the whole family myself.
3. As a family owner, I want to invite adult family members via email, so that they can have their own account and contribute to planning.
4. As an invited adult, I want to accept an invitation and create my own account, so that I can access and contribute to the family plan.
5. As a family owner, I want to set the family's app language (English or Polish), so that all members see the app in the correct language.
6. As a family owner, I want to assign roles to members (Adult or Child profile), so that access is appropriate for each family member's age.
7. As an adult member, I want to edit any family member's meal and activity plan, so that I can contribute to the household planning.
8. As a child profile, I want to view my own meal and activity plan, so that I know what to eat and what activities are scheduled for me.

### Recipe Book

9. As an adult member, I want to create a recipe with a name, description, optional photo, base serving count, and a list of ingredients, so that the family has a personal recipe library.
10. As an adult member, I want to add ingredients to a recipe with a quantity and unit (e.g. 200g, 2 cups), so that the shopping list can calculate totals accurately.
11. As an adult member, I want to assign each ingredient to a category (e.g. produce, dairy, meat, pantry), so that the shopping list is organized by category.
12. As an adult member, I want to browse the family recipe book, so that I can quickly find and reuse recipes we enjoy.
13. As an adult member, I want to edit or delete an existing recipe, so that the recipe book stays accurate and up to date.
14. As an adult member, I want to upload a photo for a recipe, so that we can visually identify dishes quickly.
15. As an adult member, I want to view the scaled ingredient quantities for a recipe given a specific number of servings, so that I know exactly how much to prepare when cooking.

### Ingredient Library

16. As an adult member, I want to add ingredients to the family ingredient library (name, default unit, category), so that they are reusable across all recipes.
17. As an adult member, I want to search the ingredient library when building a recipe, so that I can reuse existing ingredients and keep the shopping list aggregation accurate.
18. As an adult member, I want to edit an ingredient's name, unit, or category, so that the library stays accurate.

### Meal Planning

19. As an adult member, I want to view a weekly meal plan in a calendar-style layout, so that I can see the whole week at a glance.
20. As an adult member, I want to view the next week's plan while planning the current week, so that I can plan ahead.
21. As an adult member, I want to define named meal slots for the day (e.g. Breakfast, Lunch, Dinner) with an optional time window, so that the plan matches our family's eating schedule.
22. As an adult member, I want to add multiple dishes to a single meal slot, so that a meal can consist of more than one recipe.
23. As an adult member, I want to assign a dish to all family members or a specific subset, so that shared and individual meals coexist in the same slot.
24. As an adult member, I want to specify portions per family member for a dish, so that ingredient quantities in the shopping list are calculated correctly.
25. As an adult member, I want to plan a dish across a date range (e.g. Monday–Wednesday), so that batch-cooked meals are correctly reflected across multiple days without duplicate entries.
26. As an adult member, I want to see the total portions required for a batch-cooked dish (members × days), so that I know exactly how much to prepare.
27. As an adult member, I want to add a dish to a meal slot directly from the recipe book, so that planning is fast and consistent.

### Shopping List

28. As an adult member, I want the shopping list to be automatically generated from the weekly meal plan, so that I don't have to manually calculate what to buy.
29. As an adult member, I want the shopping list to aggregate the same ingredient across all recipes and days into a single line item with the total quantity, so that I have one consolidated view of what to buy.
30. As an adult member, I want the shopping list to be grouped by ingredient category, so that I can navigate the supermarket efficiently.
31. As an adult member, I want to add manual items to the shopping list (freeform text), so that I can include non-recipe household items.
32. As a family member on mobile, I want to check off items on the shopping list while shopping, so that I can track what I've already picked up.
33. As a family member on mobile, I want the shopping list to work offline, so that I can use it in the supermarket even without a signal.
34. As a family member on mobile, I want check-offs made offline to sync when I reconnect, so that the list stays accurate for other family members.

### Activity Planning (v3)

35. As an adult member, I want to add individual training activities (gym, running, cycling) to a family member's weekly plan, so that fitness goals are tracked alongside meals.
36. As an adult member, I want to add family group activities (walk, bike trip, other) to the weekly plan, so that shared fitness time is visible to everyone.
37. As an adult member, I want to view both individual and group activities in the weekly plan, so that the full week's schedule is in one place.
38. As a family member, I want to log whether a planned activity was completed, so that we can track actual vs. planned fitness.

---

## Implementation Decisions

### Roles & Access

- **Owner:** Created when the family group is set up. Has billing rights and can delete the family. Full access to all planning features.
- **Adult:** Invited via email or added as a managed profile. Full access to create/edit meal plans, recipes, and activity plans for any family member.
- **Child profile:** A lightweight managed profile (name, age, dietary notes). No login required. Can be viewed by adults; child login deferred to a future version.
- Family members without accounts are profiles only — the owner or any adult manages their data.

### Monorepo Structure (Nx)

- `apps/web` — Next.js application (web UI + API route handlers)
- `apps/mobile` — Expo / React Native application
- `libs/api` — Business logic and service layer, consumed by Next.js route handlers
- `libs/db` — Drizzle ORM schema and database client
- `libs/types` — Shared TypeScript interfaces and DTOs
- `libs/i18n` — Translation strings for English and Polish

### Backend & API

- Next.js API routes serve as the sole backend for both web and mobile.
- Business logic is encapsulated in `libs/api`, keeping it decoupled from the Next.js framework.
- Both web and mobile use TanStack Query (React Query) for data fetching, caching, and mutation handling.
- Mobile calls the same Next.js API endpoints as the web client.

### Authentication

- Clerk handles authentication: email/password, magic links, and OAuth (Google, Apple).
- Adult members with accounts authenticate via Clerk.
- Child profiles have no authentication; they are managed by authenticated adults.
- Family language is a family-level setting, not per-user.

### Database

- PostgreSQL via Neon (production) and Docker Compose with a local PostgreSQL instance (development).
- Drizzle ORM for schema definition, migrations, and queries.

### File Storage

- Recipe photos stored in object storage (UploadThing for production, MinIO in Docker Compose for local development).
- Both are S3-compatible — same interface in all environments.

### Meal Data Model (key relationships)

- **Family** → has many **Members** (profiles)
- **Family** → has many **MealSlots** (named, with optional time window; ordered per day)
- **WeekPlan** → belongs to Family, scoped to a calendar week
- **PlannedDish** → belongs to WeekPlan + MealSlot, references a Recipe, has a date range (start/end day), and a list of **MemberPortions** (member + portion count)
- **Recipe** → belongs to Family, has a base serving count and many **RecipeIngredients**
- **RecipeIngredient** → references an **Ingredient** (family ingredient library), with quantity and unit
- **Ingredient** → belongs to Family, has name, default unit, and category

### Shopping List Logic

- Generated on-demand from all PlannedDishes in a WeekPlan.
- For each PlannedDish: total portions = sum of MemberPortions × number of days in date range.
- Ingredients are scaled proportionally from the recipe's base serving count.
- Same ingredient across multiple recipes/days is summed into a single line item.
- Grouped by ingredient category.
- Manual additions stored as freeform ShoppingListItems alongside generated items.
- Check-off state persisted per shopping list item.

### Offline (Mobile)

- Shopping list is persisted locally using TanStack Query's AsyncStorage persister.
- Check-off mutations are queued offline and synced on reconnect.
- All other features require connectivity in v1.

### Internationalization

- English and Polish supported from day one.
- Family-level language setting (not per-user in v1).
- UI strings routed through `next-intl` (web) and `expo-localization` (mobile).
- Ingredient names are user-generated content — stored in the user's language, not translated automatically in v1.
- Translation files live in `libs/i18n`.

### Business Model

- Core features (meal planning, recipe book, shopping list, activity planning) are free forever.
- AI features and premium extras (recipe import from URL/image, etc.) are behind a paid subscription.
- Billing introduced in v2 via Stripe.

---

## Testing Decisions

### What Makes a Good Test

- Tests should verify external behavior, not implementation details.
- A good test describes what the system does (outputs, side effects, API responses), not how it does it internally.
- Avoid testing private methods, internal state, or framework internals directly.

### Modules to Test

- **`libs/api` (business logic):** Unit and integration tests for all service functions — meal plan generation, shopping list calculation (ingredient aggregation, portion scaling, date range expansion), recipe CRUD, ingredient library management.
- **Shopping list calculation:** Particularly important — this is the most mathematically complex feature. Test cases should cover: single dish/single day, batch dish across multiple days, mixed shared and individual portions, same ingredient from multiple recipes, unit conversion edge cases.
- **API route handlers (`apps/web`):** Integration tests verifying correct HTTP responses, authentication enforcement, and request validation.
- **Mobile offline sync:** Tests for queue-and-sync behavior of check-off mutations (TanStack Query offline persistence).

### Out of Scope for Testing in v1

- UI component snapshot tests.
- End-to-end browser automation tests (deferred).

---

## Out of Scope (deferred to later versions)

**v2 (Food Agent):**
- AI-assisted weekly meal plan generation
- AI recipe creation assistance
- Recipe import from URL or image (premium)
- Nutritional data (calories, macros) per recipe/dish
- Copy/template previous week's plan
- Recipe share-by-link
- Push notifications

**v3 (Training):**
- Individual training plan (gym, running, cycling)
- Family group activity planning
- Activity logging and tracking

**v4 (Training Agent):**
- AI training advisor
- AI recognition of family fitness habits
- AI-aligned healthy/fit recommendations

**v5 (Child Accounts):**
- Child login with parental consent flow
- Per-user language preference
- Age-gating and COPPA-compliant flows

**Future:**
- Community recipe library (browse and import other families' recipes)
- Home inventory and food waste tracking
- Ingredient internationalization (multi-language ingredient names)
- Per-user language override
- Mobile push notifications
- Full offline mode (beyond shopping list)
- External food database integration (Open Food Facts, USDA, etc.)

---

## Further Notes

- The app is named **FitFam**.
- Target languages at launch: English and Polish.
- One family member (the Owner) can manage the entire family without requiring other members to create accounts.
- The weekly plan is the primary planning unit; the system supports previewing the next week while planning the current one.
- Batch cooking is a first-class concept: a dish planned across a date range is one entry, not duplicated per day, and the shopping list reflects the correct total.
- Docker Compose provides a full local development environment (PostgreSQL + MinIO) matching production interfaces.
- Hosting provider for the web app is not finalized; Next.js deployment should remain provider-agnostic (Vercel, Railway, Fly.io, or self-hosted).
