# Next.js Migration Plan for Emmasdale SDA Church Frontend

This document outlines the comprehensive strategy to migrate the existing `create-react-app` (CRA) frontend to a modern **Next.js (App Router)** architecture, specifically targeting a "YC-backed startup" standard.

## 1. Why Migrate to Next.js?
*   **Performance (SEO & Load Times)**: The current CRA is a Single Page Application (SPA). Search engines have a hard time indexing SPAs. Next.js offers Server-Side Rendering (SSR) and Static Site Generation (SSG), making pages like "About", "Ministries", and "Events" instantly loadable and highly SEO-friendly.
*   **Outdated Tooling**: `create-react-app` is officially deprecated by the React team. Migrating ensures you stay on a supported, modern build tool (Webpack/Turbopack via Next.js).
*   **Simplified Routing**: Next.js uses file-system-based routing, which will allow us to remove `react-router-dom` entirely, simplifying the architecture.
*   **API Routes**: Next.js allows you to build backend API routes in the same repository. While we already have a dedicated Express backend, Next.js API routes can act as a secure middle-layer (BFF - Backend for Frontend) in the future if needed.

## 2. Architecture & Tech Stack Changes
*   **Framework**: Next.js 14/15 using the **App Router** (`app/` directory).
*   **Styling**: 
    *   Currently using `styled-components`. Next.js App Router works best with **Tailwind CSS** or CSS Modules due to Server Components. 
    *   *Recommendation*: We can keep `styled-components` initially (using the `'use client'` directive) to speed up migration, but gradually refactor to Tailwind CSS or CSS Modules for better Server Component compatibility.
*   **State Management**: 
    *   Currently using a massive `appContext.js` with `useReducer` for all global state (auth, posts, events, UI state).
    *   *Recommendation*: Split the state. 
        *   Use **React Context** strictly for UI state (e.g., sidebar open/close).
        *   Use **Zustand** or **Redux Toolkit** for global auth state.
        *   Use **Next.js native fetch** (or a library like `React Query`/`SWR`) for data fetching instead of storing API responses in the global reducer.
*   **Routing**: Remove `react-router-dom`.

## 3. Step-by-Step Migration Strategy (YC-Backed Startup Standard)

### Phase 1: Modern Data Fetching & Server Components (Efficiency & Speed)
Currently, your app likely fetches data on the client using `axios` inside `useEffect` or a global Context. This causes layout shifts, loading spinners, and poor SEO.

1.  **Implement React Server Components (RSCs):** Move data fetching to the server directly inside your `page.jsx` files using native `fetch()`. This ships raw HTML to the client instantly.
2.  **Utilize Next.js Caching:** Use Next.js caching (`fetch(url, { next: { revalidate: 3600 } })`) to cache heavy queries (like posts or events) and only revalidate them when needed.
3.  **Replace Axios with Server Actions:** For mutations (creating a post, submitting a contact form), use Next.js Server Actions instead of traditional API routes and client-side `axios` calls. This reduces the client bundle size.
4.  **Add SWR or React Query:** For the few places that *must* fetch data on the client (e.g., real-time search), use TanStack Query or SWR instead of standard `useEffect`.

### Phase 2: State Management Overhaul (Efficiency)
1.  **Deprecate `appContext.js`:** Your global context (`appContext.js`, `actions.js`, `reducer.js`) is an old React pattern that forces the entire app to render on the client (`"use client"`). 
2.  **Localize State:** Most global state is just server data caching, which Next.js handles automatically now. Move UI-only state (like mobile menu toggles) to localized context providers or a lightweight library like `Zustand`.

### Phase 3: Performance & Asset Optimization
1.  **Unify Styling (Drop Styled-Components):** I see you have both `tailwindcss` and `styled-components` in your `package.json`. `styled-components` requires heavy client-side JavaScript to inject styles and blocks streaming in Next.js. We should migrate everything to Tailwind CSS.
2.  **Optimize Images:** Replace all standard `<img src="...">` tags with Next.js `<Image />`. This automatically serves WebP/AVIF formats, resizes based on device screen, and prevents Cumulative Layout Shift (CLS).
3.  **Dynamic Imports:** Heavy client components (like `react-elastic-carousel`) should be lazy-loaded using `next/dynamic` so they don't block the initial page load.

### Phase 4: Security Enhancements
1.  **Next.js Middleware:** Set up a proper `middleware.ts` file to protect dashboard routes (`/dashboard/*`) at the edge. If a user doesn't have a valid HTTP-only token, they are redirected before the page even begins to render.
2.  **Strict Content Security Policy (CSP):** Add a strict CSP in your `next.config.mjs` to prevent XSS attacks (similar to what we did on the backend with Helmet).
3.  **Secure Environment Variables:** Ensure no sensitive keys (like Cloudinary secrets) are accidentally exposed to the client by checking for the `NEXT_PUBLIC_` prefix.

### Phase 5: Type Safety & Code Quality (Best Practices)
1.  **Migrate to TypeScript (`.tsx`):** We modernized the backend to TypeScript, but the frontend is still using `.jsx`. We need to rename these files to `.tsx` and share the exact same Zod schemas and Types from your backend to your frontend.
2.  **End-to-End Type Safety:** This ensures that if you change an API response on the backend, the frontend will immediately throw a build error if it's not updated, preventing runtime crashes.

## 4. Challenges to Anticipate
*   **Styled-Components + Server Components**: Styled-components require a specific registry setup in Next.js App Router to prevent hydration mismatches. We will need to configure `styled-components` correctly in `layout.js` or plan a migration to Tailwind.
*   **The "Massive Context" Anti-pattern**: Your current `appContext.js` handles *everything* (Auth, UI, Data fetching). Breaking this apart into Server Components and distinct hooks will be the most time-consuming but rewarding part of the migration.