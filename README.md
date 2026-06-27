# Client Servicing Console

Internal BofA-style client servicing tool built on **Angular 14** for the Angular 14→19 upgrade demo. This repo is a genuine, runnable application seeded with migration specimens for each responsibility bucket.

## Quick start

**Requirements:** Node 16.20.2 (see `.nvmrc`), npm 8+

```bash
npm ci --legacy-peer-deps
npm start          # json-server :3000 + ng serve :4200
```

Demo credentials: `analyst` / `demo123` (also `manager` / `demo123`)

## Screens

| Route | Description |
|-------|-------------|
| `/login` | OAuth2/OIDC stub (fake token, no external IdP) |
| `/dashboard` | Client list — Material table + NgRx entity store |
| `/clients/:id` | Branded client detail (flex-layout, MDC Material, legacy widget) |
| `/notifications` | Preference settings + a11y examples + timing specimen |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Mock API + dev server |
| `npm run build:prod` | Production build |
| `npm test` | Jest unit tests |
| `npm run test:coverage` | Coverage report (~70–80%, intentional gaps) |
| `npm run lint` | ESLint + Prettier |
| `npm run e2e` | Cypress functional e2e |
| `npm run e2e:visual` | Visual regression on client detail |

## Migration specimens

### Bucket A — Deterministic / automatic
- **A1:** All packages pinned at Angular 14 floor
- **A2:** `TestBed.get()`, `relativeLinkResolution: 'legacy'`, RxJS `.toPromise()`, classic `APP_INITIALIZER`
- **A3:** Node 16.20 + TypeScript 4.7 env floors (v16/v17 hops force bumps)

### Bucket B — Modernization deferred
- NgModules, `*ngIf`/`*ngFor`, `HttpClientModule` throughout — **not** upgraded to standalone / `@if` / `provideHttpClient()` during migration

### Bucket C — Judgment cells
- **C1:** `@angular/flex-layout` on client detail → replace with CSS + visual regression
- **C2:** Pre-MDC Material + pixel SASS + Cypress DOM assertions → MDC bridge + visual regression
- **C3:** `NotificationBatchService` timing logic — **deliberately under-tested** at baseline
- **C4:** `@bofa/legacy-sparkline-widget` (peer `@angular/core <= 16`) → escalation memo at block

## Known upgrade considerations

- `@angular/flex-layout` is deprecated and removed by target Angular version
- Angular Material MDC migration (v15) affects DOM/CSS on branded client detail screen
- Legacy sparkline widget caps at Angular 16 — requires fork/replace decision
- Notification timing module behavior may shift with v18 event coalescing / v19 effect timing
- Deferred modernization (Bucket B) is intentional per Decision Guide

## Intentional test gaps

| Module | Reason |
|--------|--------|
| `notifications/notification-batch.service.ts` | C3 — Devin writes characterization test first |
| `notifications/render-count/` | C3 — timing oracle |
| `client-detail/` layout shell | C1 — optional layout gap |

## Devin artifacts

- Decision Guide: `/.devin/bofa-angular-migration-decisions.md` *(provided separately)*
- Upgrade playbook: `/.devin/ng-upgrade-playbook.md`

## Acceptance checklist (Angular 14 baseline)

- [x] `npm ci --legacy-peer-deps` clean; lockfile committed
- [x] `ng serve` — all 4 screens work
- [x] `ng build --configuration production` succeeds
- [x] Jest unit suite green (C3/C1 gaps documented)
- [x] Cypress e2e green (Material DOM assertion included)
- [x] Visual-regression baseline on client detail
- [x] jest-axe a11y checks green
- [x] ESLint + Prettier clean
- [x] All specimens A, B, C1–C4 present and documented
