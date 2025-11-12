# Tailwind Landing Starter (v4) — Guide

## TL;DR (read this first)
- **Goal:** Turn Figma into a **fully responsive** static landing page.
- **No inline styles.** Do **not** add `<style>` or `style="..."` in HTML. Use classes/ids only.
- **One CSS source:** Edit **`public/assets/input.css`** only. `tailwind.css` is generated.
- **Group CSS by section** (Hero, Features, Pricing, FAQ, Footer…). Keep related classes together.
- **Colors:** Set **`--color1…--color5`** + **`--on-colorN`** at the top of `input.css`.
- **Assets:** Download from Figma → store under `public/assets/images/` and `public/assets/icons/` using **section-prefixed** filenames (e.g., `hero-`, `features-`).
- **Before pushing:** run `npm run format && npm run lint && npm run build` and verify responsiveness (320–1440px+).

---

## What you’ll ship
A single `index.html` using Tailwind utility classes + section-scoped component classes from `input.css`, with local assets and a compiled `tailwind.css`.

---

## Project layout
```
public/
  assets/
    input.css        # the ONLY CSS you edit (tokens + section groups)
    tailwind.css     # generated CSS (do not edit, do not commit)
  index.html         # your page (duplicate if needed)

eslint.config.mjs    # ESLint v9 flat config (HTML rules: 2-space indent)
.stylelintrc.json    # Stylelint rules (for input.css)
.stylelintignore
.htmlhintrc
.prettierrc
.editorconfig
mise.toml            # Node version (mise)
package.json
```

---

## Setup
**Requirements**
- Node **24.11** (managed via `mise`)
- npm

**Using mise**
```bash
# Install mise if needed
curl https://mise.run | sh

# From the repo root
mise install
node -v  # should show v24.11.x
```

---

## Run & Build
**Dev server**
```bash
npm install
npm run dev
```
- Opens server at `http://127.0.0.1:5173`
- `/public` is the web root
- Tailwind recompiles on save

**Production build**
```bash
npm run build
```
Compiles `public/assets/input.css` → `public/assets/tailwind.css` (minified).

---

## Lint & Format (CI rules)
```bash
npm run lint         # CSS (Stylelint) + HTML (HTMLHint) + HTML indentation (ESLint)
npm run format:check # Prettier check (2-space indent, Tailwind class sorting)

# Optional local fix
npm run format       # Prettier write
```
**Before pushing**, make sure `npm run lint` and `npm run format:check` both pass.

---

## Authoring rules

### HTML (structure only)
- **No custom CSS inside HTML**  
  - ❌ No `<style>` tags, no `style="..."` inline styles  
  - ✅ HTML uses **classes/ids only**
- Use semantic tags (`header`, `main`, `section`, `footer`).
- **Indentation:** 2 spaces per level (Prettier enforces this).
- **Responsive:** use Tailwind responsive variants (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).  
  Example:
  ```html
  <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">...</div>
  ```
- **Link only the compiled CSS:**
  ```html
  <link href="/assets/tailwind.css" rel="stylesheet" />
  ```
- **Images:** always provide `alt` text.

### CSS (single source, grouped by section)
- **Edit only:** `public/assets/input.css`
- **Do not edit/commit:** `public/assets/tailwind.css` (generated)
- Keep classes **grouped by section** (Hero, Features, Pricing, FAQ, Footer…). Use clear comments and keep related classes contiguous.

---

## `input.css` template & conventions
**`public/assets/input.css`**
```css
@import "tailwindcss";

/* =======================================
   0) Color tokens (full names, simple)
   - Set 3–5 colors from Figma here.
   - If text will sit on a color, set its matching --on-colorN for contrast.
   ======================================= */

:root {
  /* Example palette (replace with the landing’s colors) */
  --color1: #fc753b; /* e.g., primary accent */
  --color2: #64c8ee; /* e.g., secondary */
  --color3: #fff9f5; /* e.g., soft surface */
  --color4: #3a3a3a; /* e.g., default text / dark surface */
  --color5: #ffffff; /* e.g., page background */

  /* Text-on-color contrasts (adjust for readability as needed) */
  --on-color1: #ffffff;
  --on-color2: #0b1020;
  --on-color3: #0f172a;
  --on-color4: #ffffff;
  --on-color5: #0f172a;
}

/* Optional small global tweak */
@layer base {
  body {
    color: var(--color4);            /* default text */
    background-color: var(--color5); /* page background */
  }
}

/* =======================================
   1) Utilities (helpers with full names)
   - You can also use Tailwind arbitrary values like bg-[--color1].
   ======================================= */
@layer utilities {
  .text-color1 { color: var(--color1); }
  .text-color2 { color: var(--color2); }
  .text-color3 { color: var(--color3); }
  .text-color4 { color: var(--color4); }
  .text-color5 { color: var(--color5); }

  .bg-color1 { background-color: var(--color1); color: var(--on-color1); }
  .bg-color2 { background-color: var(--color2); color: var(--on-color2); }
  .bg-color3 { background-color: var(--color3); color: var(--on-color3); }
  .bg-color4 { background-color: var(--color4); color: var(--on-color4); }
  .bg-color5 { background-color: var(--color5); color: var(--on-color5); }

  .border-color1 { border-color: var(--color1); }
  .border-color2 { border-color: var(--color2); }
  .border-color3 { border-color: var(--color3); }
  .border-color4 { border-color: var(--color4); }
  .border-color5 { border-color: var(--color5); }

  .ring-color1 { --tw-ring-color: var(--color1); }
  .ring-color2 { --tw-ring-color: var(--color2); }
}

/* =======================================
   2) Components — GROUP BY SECTION
   Keep related classes together and documented.
   ======================================= */
@layer components {
  /* ---------- NAV ---------- */
  .nav { @apply flex items-center justify-between py-4; }
  .nav-logo { @apply text-xl font-semibold text-color4; }
  .nav-link { @apply text-sm text-gray-600 hover:text-gray-900; }

  /* ---------- HERO ---------- */
  .hero { @apply grid items-center gap-8 py-16 md:grid-cols-2; }
  .hero-title { @apply text-4xl font-bold tracking-tight text-color4; }
  .hero-subtitle { @apply mt-4 text-gray-600; }
  .hero-cta { @apply inline-flex items-center rounded-md px-5 py-3 bg-color1; } /* text contrasts via --on-color1 */

  /* ---------- FEATURES ---------- */
  .features { @apply grid gap-6 md:grid-cols-2 xl:grid-cols-3; }
  .feature-card { @apply rounded-xl border bg-color5 p-6 shadow-sm; }
  .feature-title { @apply text-lg font-semibold text-color4; }
  .feature-pill { @apply inline-flex items-center rounded-full px-3 py-1 bg-color3; }

  /* ---------- PRICING ---------- */
  .pricing { @apply grid gap-6 md:grid-cols-3; }
  .plan { @apply rounded-2xl border p-6 shadow-sm bg-color5; }
  .plan-cta { @apply mt-6 inline-flex items-center rounded-md px-5 py-3 bg-color1; }

  /* ---------- FAQ ---------- */
  .faq { @apply space-y-4; }
  .faq-item { @apply rounded-lg border p-4 bg-color5; }
  .faq-q { @apply font-medium text-color4; }
  .faq-a { @apply mt-2 text-gray-600; }

  /* ---------- FOOTER ---------- */
  .footer { @apply border-t py-10 text-sm text-gray-600; }
  .footer-links { @apply flex flex-wrap items-center gap-4; }
}
```

---

## Assets & Naming
All assets must be downloaded from Figma and stored locally in **public/assets**.

**Folders**
```
public/assets/images/   # photos, illustrations, logos, screenshots
public/assets/icons/    # UI pictograms (SVG preferred)
```

**File naming**
- Use **lowercase, kebab-case**.
- **Prefix filenames by section** only (no global prefixes). Typical sections:
  - `nav-`, `hero-`, `features-`, `pricing-`, `faq-`, `footer-`, `team-`, `logos-`, `testimonials-`, `contact-`.
- **Single size per asset** (no @2x/srcset variants).
- Optional qualifiers: `-dark`, `-light`, `-alt`, `-v2`.
- Extensions:
  - `svg` for icons/logos (preferred)
  - `webp` for photos/illustrations (png/jpg only if necessary)

**Examples**
```
public/assets/icons/hero-phone.svg
public/assets/icons/features-check.svg
public/assets/icons/nav-hamburger.svg

public/assets/images/hero-clean-smile.webp
public/assets/images/features-appointment-reminders.webp
public/assets/images/logos-gleam-dentistry.svg
public/assets/images/team-dr-sanchez.webp
public/assets/images/pricing-card.webp
```

**Usage**
```html
<img src="/assets/icons/hero-phone.svg" alt="" class="h-5 w-5" />
<img src="/assets/images/hero-clean-smile.webp" alt="Patient smiling after dental cleaning" class="rounded-xl shadow" />
```

**Notes**
- Do not link remote assets; everything must live under `public/assets/`.
- Provide meaningful `alt` text (empty `alt=""` only for purely decorative icons).
- Ensure `npm run format && npm run lint` passes before pushing.

---

## Responsiveness checklist
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
- Test at **320px → 1440px+** (hero, grids, cards, footer).
- Avoid fixed widths unless necessary.
- Use `.container` for centered content (breakpoints in `tailwind.config.js`).

---

## Common gotchas
**404 for CSS in dev**
```html
<link href="/assets/tailwind.css" rel="stylesheet" />
```
(Do **not** use `/public/assets/...`; the server root is `/public`.)

**Tailwind v4 import**
```css
@import "tailwindcss";   /* correct */
```
_Not_ `@import("tailwindcss");` or `@import url("tailwindcss");`.

**Classes/indentation off**
```bash
npm run format
npm run lint
```

---

## Commands (reference)
```bash
npm run dev            # Tailwind watch + local server
npm run build          # Compile CSS for production
npm run lint           # CSS + HTML + HTML indentation checks
npm run format         # Fix formatting (Prettier)
npm run format:check   # Verify formatting only (CI uses this)
```
