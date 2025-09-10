# Migration & Refactor TODO

Goal: Replace the existing Next.js frontend with the design & UX structure provided in `alatlens/`, then migrate all styling and component patterns from Tailwind-style utility classes to **Material UI (MUI)**, fully removing Tailwind and any related tooling/utilities (including `@tailwind` directives, utility class strings, Tailwind config, `class-variance-authority`, `tailwind-merge`, etc.). The `alatlens/` directory remains an untouched reference template until the migration is complete, then optionally archived or removed.

---
## Phase 0 · Alignment & Constraints
- [x] Approach locked: **Clone & Adopt** (copy from `alatlens/` into `src/`), then refactor to MUI; do NOT edit original template.
- [x] `alatlens/` frozen (read-only until Phase 9 decommission).
- [x] No legacy preservation: remove old pages (`/home`, `/history`, `/login`, `/signup`, etc.) once replacement shell runs.
- [ ] Decide on dark mode support scope (initial theme vs. deferred).
- [ ] Decide whether to keep or remove existing Gemini integration untouched.

## Phase 1 · Inventory & Preparation
- [ ] Catalog all design tokens (CSS variables, gradients, shadows) from `alatlens/styles/globals.css`.
- [ ] Enumerate component categories (navigation, layout shell, data viz, forms, feedback, analytics).
- [ ] List all Tailwind-style utility class usage patterns to eliminate (layout, spacing, color, typography, border, interaction states, dark: variants, responsive variants).
- [ ] Identify any Radix UI primitives actually used (to decide removal or wrapping strategy).
- [ ] Note any third-party libs to retain (e.g. `recharts`, `framer-motion`, `sonner`).

## Phase 2 · Scaffold MUI Foundation
- [ ] Add dependencies: `@mui/material @mui/icons-material @emotion/react @emotion/styled`.
- [ ] Create `src/theme/index.ts` with light + dark themes mapping tokens (palette, gradients, shadows, radii, typography scale).
- [ ] Add theme augmentation for custom `gradients`, `shadows.alat`, and semantic colors.
- [ ] Implement `ThemeProvider` + `CssBaseline` in `src/app/layout.tsx`.
- [ ] Add color mode context (optional toggle) if dark mode is in scope.
- [ ] Introduce a `DesignTokens.md` (optional internal doc) mapping old → new.

## Phase 3 · Clone Template Code (Working Copy)
- [ ] Create `src/feature/alat/` (or `src/modules/alat/`).
- [ ] Copy `alatlens/components/**/*` into the working directory (preserve structure).
- [ ] Copy `alatlens/styles/globals.css` → temporary reference file (`_legacy-globals.css`) WITHOUT importing it.
- [ ] Remove direct root usage of original `ALATLensApp` in `src/app/page.tsx` and point to cloned version.
- [ ] Ensure all relative import paths inside clone resolve (adjust deep relative paths if needed).
- [ ] Add barrel exports if helpful (`index.ts`).

## Phase 4 · Systematic Tailwind Class Elimination (In Working Copy)
Process per component group:
1. Replace structural wrappers with MUI `Box`, `Stack`, `Grid`, `Container`.
2. Convert utility class clusters to `sx` objects (spacing, layout, flex, grid).
3. Map color-related classes to theme palette or custom tokens.
4. Replace typography classes with `Typography` variants; remove manual font weight where variant covers it.
5. Convert border/radius/shadow classes to theme (`theme.shape.borderRadius`, custom shadows).
6. Use `sx` pseudo-selectors for `hover:`, `focus:`, `active:` states.
7. Replace dark-mode conditional classes with theme mode condition (`(theme) => ({ ...(theme.palette.mode === 'dark' && {...}) })`).
8. Remove any leftover className string once fully translated.

Tasks:
- [ ] Write a migration helper script / checklist for each file.
- [ ] Migrate layout shell (Sidebar, Header, MobileBottomBar) → MUI components (`Drawer`, `AppBar`, `Toolbar`, `BottomNavigation`).
- [ ] Migrate buttons (gradient + variant logic) → custom `MuiButton` + variant overrides.
- [ ] Migrate cards (analytics, dashboard) → `Paper` with gradient backgrounds via `sx`.
- [ ] Migrate forms (inputs, sliders, toggles) to MUI equivalents; remove bespoke styling.
- [ ] Replace any Radix-based components with MUI versions (Dialog, Menu, Tooltip, Popover, Accordion, Tabs, Select, Switch, Slider, Progress, Avatar, etc.).
- [ ] Replace custom command/menu structures with MUI `Menu`, `Autocomplete`, or `List` as appropriate.
- [ ] Replace skeleton loaders with `Skeleton` component.
- [ ] Replace table markup with `Table`, `TableHead`, `TableBody` where present.
- [ ] Recreate charts area using existing `recharts` or migrate later (defer if stable).
- [ ] Remove dependency on `class-variance-authority` and variant utilities (replace with MUI `variant` prop or custom prop-based styling).
- [ ] Ensure no `className` left referencing Tailwind patterns across cloned code.

## Phase 5 · Theming & Token Mapping Enhancements
- [ ] Implement gradient helper function, e.g. `theme.custom.gradients.primary`.
- [ ] Map semantic intent tokens: success, warning, info, destructive.
- [ ] Implement shadow scale matching prior design (`shadow-alat-*`).
- [ ] Add responsive spacing strategy (MUI spacing scale) to replace implicit Tailwind spacing.
- [ ] Audit for any hard-coded hex values; centralize into theme.

## Phase 6 · Purge Tailwind & Related Tooling
(Only after confirming zero Tailwind class usage in `src/`)
- [ ] Remove `@tailwind` directives from any CSS (should already be unused).
- [ ] Delete `tailwind.config.js`.
- [ ] Delete `postcss.config.js` if only used for Tailwind.
- [ ] Remove `globals.css` Tailwind-specific layers; retain only minimal root resets if needed.
- [ ] Uninstall deps: `tailwindcss`, `postcss`, `autoprefixer`, `tailwind-merge`, `class-variance-authority`, any other Tailwind-specific utilities.
- [ ] Remove Tailwind content paths from build.
- [ ] Verify no references via `grep -R "tailwind"` or class pattern heuristics.

## Phase 7 · Dependency Cleanup & Code Hygiene
- [ ] Remove unused Radix UI packages once all replacements done.
- [ ] Remove `lucide-react` if replaced by `@mui/icons-material` (or keep subset intentionally).
- [ ] Ensure tree-shake friendly imports (use `@mui/material/Button` pattern not barrel if needed for bundle size strategy—evaluate).
- [ ] Run TypeScript build; fix any leftover type imports from removed libs.
- [ ] ESLint pass (ensure no `className` with Tailwind residue).
- [ ] Pre-commit: optional script to block introduction of Tailwind-like classes.

## Phase 8 · QA & Verification
- [ ] Visual regression sanity (manual) for key screens: dashboard, transactions, analytics, settings.
- [ ] Accessibility spot check (landmarks, tab order, color contrast against theme palette).
- [ ] Mobile viewport checks for navigation & responsive layout.
- [ ] Test dark mode if enabled.
- [ ] Confirm gradients render correctly across browsers (devtools simulation).
- [ ] Confirm no network errors from removed components.

## Phase 9 · Template Directory Decommission
- [ ] Confirm parity between new MUI-based implementation and original template.
- [ ] Archive `alatlens/` (zip/move) OR delete after sign-off.
- [ ] Final grep to ensure no imports from `alatlens/` remain.

## Phase 10 · Hardening & Future-Proofing
- [ ] Add custom component wrappers (e.g. `components/ui/Button.tsx`) to standardize gradient variants.
- [ ] Document styling guidelines (prefer `sx` vs. `styled` usage boundaries).
- [ ] Optional: Introduce storybook for new component library (deferred unless needed).
- [ ] Optional: Add bundle analysis to confirm size improvements post-removal.

---
## Acceptance Criteria
- No Tailwind config, directives, or utility class strings present in repository (except inside preserved, un-imported `alatlens/` until deletion phase).
- All UI surfaces rendered using MUI components, `sx` prop, theme tokens, or minimal custom styled components.
- All design tokens migrated into MUI theme; no orphan CSS variables relied upon (unless intentionally kept for runtime theming—document if so).
- Build succeeds with zero references to removed dependencies.
- Dark mode (if in scope) functions without Tailwind class toggling.

## Risk Mitigation
- Perform migration in isolated commits per component group to avoid large diffs.
- Keep original template untouched for diff comparisons until Phase 9.
- Add a temporary lint rule (regex) to fail on Tailwind-like class patterns after Phase 6 begins.

## Tooling Aids (Planned Helpers)
- Script: scan for suspicious class tokens (regex: `\b(p|m|text|bg|flex|grid|items|justify|gap|rounded|shadow)-(?:[a-z0-9/:-]+)` ) to catch leftover utility classes.
- Codemod (optional): convert spacing utilities to `sx` spacing scale heuristically.

## Open Decisions (Mark Before Phase 2 Starts)
- Keep or remove `recharts` (MUI X Charts alternative?).
- Introduce design token build step or rely solely on theme file.
- Minimum browser support (influences gradient + backdrop usage).

---
## Quick Start Execution Order (Condensed)
1. Phase 0 confirm decisions
2. Scaffold MUI theme & provider (Phase 2)
3. Clone template (Phase 3)
4. Convert navigation & layout shell
5. Convert core interactive components (buttons, forms, dialogs)
6. Convert analytics / charts containers
7. Purge Tailwind (Phase 6)
8. Dependency cleanup (Phase 7)
9. QA (Phase 8)
10. Remove template (Phase 9)
11. Hardening (Phase 10)

---
## Tracking Legend
Use GitHub issues or checklist per phase; each component conversion logged with: Component Name · Status · Notes on deviations from template.

---
End of TODO.
