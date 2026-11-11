# Seat Combo

Seat Combo is a React app for exploring Bangladesh train timetables.

## Routes

- `/home` — the landing page
- `/app` (also `/App`) — train search and schedules
- `/` — redirects to `/home`

## Local development

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`.

## Automatic deployment

This project is configured for Cloudflare Pages. Connect the GitHub repository
to a Cloudflare Pages project and set:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`

After the initial project setup, Cloudflare Pages builds and deploys each push
to the configured production branch automatically. The `public/_redirects`
file preserves the React app fallback so direct links to `/home` and `/app`
continue to work after refresh.

The train list and schedule features use the existing Seat Combo API. The API
must allow requests from the deployed site’s origin.
