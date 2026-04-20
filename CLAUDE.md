# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Eleanor's Recipes is a single-page React app for browsing, searching, filtering, and managing recipes. It was generated from a Figma design via Figma Make. There is no backend — all recipe data lives in memory inside `src/app/App.tsx` as a `recipeDatabase` array.

## Commands

```bash
pnpm install      # Install dependencies
pnpm run dev      # Start dev server (Vite HMR)
pnpm run build    # Production build
```

No test or lint scripts are configured.

## Architecture

- **`src/app/App.tsx`** — The entire application (~1,700 lines). All state (search, filters, favorites, selected recipe, add/edit forms) is managed here with `useState`. This file also contains the hardcoded `recipeDatabase` array of 23 recipes.
- **`src/app/components/ui/`** — 46 shadcn/ui components (Radix UI primitives). Treat these as library code; avoid modifying them directly.
- **`src/app/components/figma/ImageWithFallback.tsx`** — Custom image component with SVG placeholder fallback for broken URLs.
- **`src/styles/`** — CSS entry points: `index.css` imports `tailwind.css`, `fonts.css`, and `theme.css`.
- **`vite.config.ts`** — Includes a custom `figmaAssetResolver()` plugin that resolves `figma:asset/` import URIs used by Figma-generated code.

## Key Patterns

- Tailwind CSS 4 for all styling (utility classes only, no separate component CSS).
- Lucide React for icons throughout `App.tsx`.
- Recipe images are Unsplash URLs; the app ships 16 curated defaults users can pick from.
- `shadcn/ui` components use the `cn()` utility from `src/app/components/ui/utils.ts` (wraps `clsx` + `tailwind-merge`).
