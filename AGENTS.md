# Lumyla — working notes

Premium Persian (RTL) marketing site for a creative digital studio. Plain Vite + React
app (no Base44 SDK, no entities) plus a small Express API for the contact form and
newsletter.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- `web` — Vite dev server, host port **3000** → container 5173. Serves live source
  (HMR), so edits appear without a rebuild.
- `api` — Express on internal port 8080, reached by the browser through the Vite
  `/api` proxy (`API_PROXY_TARGET`), so everything stays single-origin.

Dependencies are installed at container start (`npm ci` when `package-lock.json`
exists, otherwise `npm install`). `node_modules` lives in the bind-mounted repo root
and is gitignored — do not delete `api_data` volumes to refresh them.

## Editing content

`src/data/site.js` is the single source of truth for services, portfolio projects,
blog posts, testimonials, process steps, values and the growth dashboard data.

Demo content must stay clearly labelled: project cards show «نمونه نمایشی», the
testimonials block is a demonstration state, contact details in the footer/contact
page carry a note that they are placeholders. Do not invent client names, results or
review counts.

## API

- `POST /api/contact` — validates (name ≥ 2 chars, email, message ≥ 10 chars),
  appends to `/data/messages.json` inside the `api_data` volume.
- `POST /api/subscribe` — appends to `/data/subscribers.json`.
- `GET /health` — health probe used by the compose healthcheck.

## Sandbox / preview flags

`BASE44_PREVIEW_MODE=1` (supplied by the platform) widens the Vite `allowedHosts`
list with `.${BASE44_SANDBOX_HOST_DOMAIN}` so the preview proxy host is accepted.
With the flag unset or any other value, only `localhost`/`127.0.0.1` are allowed —
the original behaviour. `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is passed through
untouched. No host values are hardcoded anywhere.

## Verify

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/
curl -s -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"تست","email":"a@b.co","message":"پیام تست برای بررسی فرم"}'
```

Expect `200` and `{"ok":true}` (delete the row you created afterwards).
