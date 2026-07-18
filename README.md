# Al-Sharkawy Website

A modern, fast, and responsive restaurant menu and ordering system tailored for the "Al-Sharkawy" restaurant. 

**Main Goal:** To provide a seamless, premium customer ordering experience through an intuitive menu and cart system, coupled with a secure administrative dashboard for real-time menu management, all backed by instant Telegram notifications for order fulfillment.

*(Screenshots Placeholder)*
<!-- Add your screenshots here: Homepage, Menu, Cart, Admin Dashboard -->

---

## 🌟 Features

### Customer Features
- **Interactive Menu:** Browse categories, view featured products, and explore special offers.
- **Dynamic Pricing:** Support for multiple sizes per product (e.g., Small, Large) with distinct prices.
- **Smart Cart:** Persisted client-side shopping cart with real-time subtotal calculation.
- **Checkout Process:** Secure checkout that displays expected delivery fee ranges, while the actual fee is confirmed manually by the restaurant.
- **Order Tracking:** Receive instant feedback with a unique order ID upon successful placement.

### Admin Features
- **Dashboard:** Secure, authenticated admin area.
- **Menu Management:** Create, read, update, and delete (CRUD) categories, products, and product sizes.
- **Offers Management:** Setup promotional offers with fixed or percentage-based discounts.
- **Site Settings:** Manage global variables like delivery messages and expected delivery fee ranges.

### Backend Features
- **Server-Side Validation:** Prices and product availability are validated on the server to prevent manipulation.
- **Edge Functions:** Fast, globally distributed serverless functions handle complex order logic securely.
- **Telegram Integration:** Orders are instantly pushed to a Telegram chat for fast restaurant kitchen response.

### Security Features
- **Service Role Order Processing:** Orders are created through the Edge Function using the Service Role Key, where all prices, products, and totals are validated on the server before being stored.
- **Row Level Security (RLS):** Read-only public access to menu items. Full access restricted to authenticated admins.
- **Strict Input Validation:** Data constraints and UUID validations ensure data integrity.

---

## 📊 Project Status

Current Status: Production Ready

Implemented

- Customer ordering
- Secure checkout
- Admin dashboard
- Product management
- Categories
- Offers
- Telegram notifications
- Site settings
- Edge Functions
- Server-side price validation

Planned

- Admin order management
- Direct image uploads
- Customer order tracking

---

## 🛠 Tech Stack

### Frontend
- **Language:** TypeScript
- **Framework:** React 19 (via Vite / Lovable Nitro)
- **Router:** TanStack Router (Type-safe file-based routing)
- **State Management:** Custom React Store (`useSyncExternalStore` for Cart) & TanStack Query (Data fetching)
- **Styling:** Tailwind CSS v4 + Radix UI components
- **Build Tool:** Vite

### Backend
- **Database:** Supabase (PostgreSQL)
- **Functions:** Supabase Edge Functions (Deno)

### Other
- **Telegram Bot:** Used for real-time order notifications.
- **Image Handling:** Images are currently managed via direct URL references.

---

## 📂 Project Structure

```text
├── src/
│   ├── components/    # Reusable UI components (buttons, layout, admin sidebar, etc.)
│   ├── hooks/         # Custom React hooks (e.g., useData for Supabase queries)
│   ├── routes/        # TanStack file-based route definitions (Customer pages & Admin views)
│   ├── services/      # API communication layer abstracting Supabase calls
│   ├── store/         # Custom state store (cart.ts using useSyncExternalStore)
│   ├── types/         # TypeScript definitions for domain models and database schemas
│   └── lib/           # Supabase client initialization and core utilities
├── supabase/
│   ├── functions/     # Deno Edge Functions (e.g., create-order)
│   └── migrations/    # PostgreSQL schema definitions and RLS policies
```

---

## 🗄 Database

### `categories`
- **Purpose:** Groups products into logical sections (e.g., Sandwiches, Drinks).
- **Important Columns:** `id`, `name`, `slug`, `image_url`, `sort_order`.
- **Relationships:** Referenced by `products.category_id`.
- **RLS:** Public read, Admin write.

### `products`
- **Purpose:** Core menu items.
- **Important Columns:** `id`, `category_id`, `name`, `base_price`, `is_active`, `discount_type`, `discount_value`.
- **Relationships:** Belongs to `categories`. Has many `product_sizes`.
- **RLS:** Public read, Admin write.

### `product_sizes`
- **Purpose:** Allows a single product to have multiple variants with distinct prices.
- **Important Columns:** `id`, `product_id`, `name`, `price`, `is_active`.
- **Relationships:** Belongs to `products`.
- **RLS:** Public read, Admin write.

### `offers`
- **Purpose:** Standalone promotional items or discounts.
- **Important Columns:** `id`, `title`, `discount_type`, `discount_value`, `is_active`.
- **RLS:** Public read, Admin write.

### `orders`
- **Purpose:** Tracks customer order summaries.
- **Important Columns:** `id`, `status`, `subtotal`, `final_total`, `notes`.
- **Relationships:** Has many `order_items`.
- **RLS:** Intended to be managed through the Edge Function. Administrative access is restricted to authenticated users.

### `order_items`
- **Purpose:** Tracks individual line items within an order.
- **Important Columns:** `order_id`, `product_id`, `product_size_id`, `quantity`, `unit_price`.
- **Relationships:** Belongs to `orders`, `products`, `product_sizes`.
- **RLS:** Admin read/write.

### `site_settings`
- **Purpose:** Global configuration variables (e.g., delivery ranges).
- **Important Columns:** `key` (PK), `value`.
- **RLS:** Public read, Admin write.

*(Note: Currently, schema creation migrations for business tables are expected to be applied manually or exist outside the source tree. Only RLS policies and site_settings migrations are present in `supabase/migrations`.)*

---

## 🛒 Order Flow

1. **Customer submits order:** The user reviews their cart and submits the checkout form.
2. **Edge Function receives payload:** The frontend sends customer details and product IDs to the `create-order` Edge Function.
3. **Server validates products:** The function fetches the latest prices and `is_active` status directly from the database. Client-provided prices, subtotals, and totals in the payload are completely ignored and recalculated entirely on the server.
4. **Server recalculates prices:** Any discounts and size-specific prices are applied accurately based on the database values.
5. **Save order** The orders record is created by the Edge Function using the Service Role Key after all server-side validation has completed.
6. **Save order_items:** Individual line items are inserted. If this step fails, the previously created order is manually deleted to avoid orphan records.
7. **Send Telegram:** The Edge Function formats the order as HTML and sends it via the Telegram Bot API.
8. **Return success:** If Telegram succeeds, the client receives the order ID and navigates to the success screen.

*Fallback Behavior:* If the Telegram API fails, the order remains safely stored in the database, but the Edge Function throws an error and the frontend receives an error message. This ensures the restaurant does not lose revenue due to third-party outages, even though the client UI shows an error.

---

## 🛡 Security

- **Server-side price calculation:** Prevents malicious users from intercepting requests to checkout with altered prices.
- **Edge Function:** Shields the Telegram bot token and administrative database keys from the client bundle.
- **Service Role Key:** Used strictly inside the Edge Function to perform all order validation and database operations in a trusted server environment.
- **RLS (Row Level Security)** Restricts write operations on administrative tables to authenticated users while allowing public read access to menu data. Order creation is handled through the Edge Function.
- **`getUser` authentication:** The admin dashboard relies on robust Supabase auth token verification.
- **Environment Secrets:** Sensitive credentials are provided at build/runtime rather than hardcoded.
- **Inactive products rejection:** The Edge Function actively prevents checkout if a product or size has been marked `is_active: false`.
- **Negative delivery fee rejection:** Prevents integer underflow attacks that might reduce the order total.
- **UUID validation:** Strict regex validation on IDs prevents malformed queries and basic injection attempts.

---

## 🚀 Deployment

### Supabase
1. Create a Supabase project.
2. **Migrations:** The `CREATE TABLE` schema for the main business tables is not included in the migrations. You must manually create these tables before running `supabase db push` (which only applies RLS policies and the `site_settings` table).
3. **Edge Functions:** Deploy the `create-order` function:
   `supabase functions deploy create-order`

### Secrets
Set the Edge Function secrets:
```bash
supabase secrets set SUPABASE_URL=... \
                     SUPABASE_SERVICE_ROLE_KEY=... \
                     TELEGRAM_BOT_TOKEN=... \
                     TELEGRAM_CHAT_ID=...
```

### Frontend (Build & Production)
1. Add `.env` variables to your hosting provider (Vercel, Lovable, Netlify).
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. The output in `.output` or `dist` is ready for static/SSR deployment depending on your Nitro configuration.

---

## 🔐 Environment Variables

### Frontend (`.env`)
- `VITE_SUPABASE_URL`: The public URL of your Supabase instance.
- `VITE_SUPABASE_ANON_KEY`: The public anonymous key for frontend read access.

### Edge Function Secrets
- `SUPABASE_URL`: Matches the frontend URL.
- `SUPABASE_SERVICE_ROLE_KEY`: The admin key allowing order insertion.
- `TELEGRAM_BOT_TOKEN`: The API token from BotFather.
- `TELEGRAM_CHAT_ID`: The channel or chat ID where orders will be sent.

---

## 🔧 Maintenance

- **Update Products/Offers:** Log into `/admin`, navigate to the respective tabs, and use the forms to toggle visibility or adjust prices.
- **Change Delivery Settings:** Navigate to `/admin/settings` to update the global delivery message or minimum/maximum fee ranges.
- **Images:** Images are currently stored using direct URL references. An optional companion Telegram bot can be used to compress images and generate direct image URLs before adding them through the Admin Dashboard.
- **Telegram:** To change the recipient chat, simply update the `TELEGRAM_CHAT_ID` secret on Supabase and restart the edge function.
- **Deploying New Versions:** Push code to the main branch. If connected to a CI/CD pipeline (e.g., Lovable / Vercel), it will automatically build and deploy.

---

## 🔮 Future Improvements

- **Admin Orders Page:** Complete the `/admin/orders` placeholder to allow viewing and managing order statuses directly on the web.
- **Admin Role System:** Replace generic authenticated write permissions with explicit administrator role checks in RLS policies.
- **Direct Image Upload:** Integrate Supabase Storage directly into the admin forms to eliminate the need for manual URL pasting.
- **Order Status Tracking:** Allow customers to track their order status via a unique URL.
- **Rate Limiting:** Implement rate limiting on the `create-order` endpoint to prevent abuse or spam.
- **Analytics:** Add basic revenue tracking and popular item metrics to the dashboard.
- **Caching & Pagination:** For large menus, implement infinite scroll and aggressive edge caching to boost performance.

---

## 📐 Architecture Decisions

- **Why prices are calculated on the server:** Client-side data cannot be trusted. If prices were accepted from the payload, an attacker could order 100 items for 0.01 ج.م.
- **Why Telegram is sent from an Edge Function:** To keep the Bot Token completely hidden from the browser, preventing unauthorized use of the bot.
- **Why orders remain in database if Telegram fails:** Third-party APIs (like Telegram) go down. Keeping the order in the database ensures the restaurant has a backup source of truth and no revenue is lost due to an external webhook failure.
- **Why Service Role Key is used for orders:** Order creation is centralized inside the Edge Function so that product availability, prices, discounts, and totals are always validated on the server before any data is written to the database.
- **Why customer accounts are not used:** To reduce friction. Food ordering often demands a guest-checkout experience to maximize conversion rates.
- **Why `site_settings` exists:** Hardcoding delivery rules in the UI forces a new codebase deployment for every minor business change. A settings table allows instant updates.

---

## ⚠️ Known Limitations

- **Image Hosting:** There is currently no integrated image upload component. Admins must host images elsewhere and paste the URL.
- **Missing Migrations:** The source code currently lacks the `CREATE TABLE` migrations for the main business tables (`categories`, `products`, etc.), requiring a manual SQL setup or a database pull.
- **Admin Orders Management:** The `/admin/orders` route is currently a placeholder. Admins rely solely on Telegram for order fulfillment.

---

## 📝 Development Notes

- The project uses **Vite + Lovable Nitro** configuration. Be cautious when adding plugins to `vite.config.ts`, as `@lovable.dev/vite-tanstack-config` automatically injects Tailwind, React, and TanStack plugins. Duplicate injections will break the build.
- **TypeScript & Supabase:** The `src/types/database.types.ts` is currently a placeholder. It is recommended to run `supabase gen types` and replace it for full end-to-end type safety in the future.

---

## 📄 Copyright

This project was developed by Omar Sayed for Al-Sharkawy Restaurant.

All rights reserved.

This source code is proprietary and may not be copied, modified, distributed, or reused without prior written permission from the project owner.