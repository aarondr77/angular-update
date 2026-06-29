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