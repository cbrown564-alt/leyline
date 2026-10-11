# Leyline website

The Leyline website is reconstructed from `leyline-website-for-claude.txt`, including the original React pages, styles, image, contact API, and shared libraries. The source bundle remains unchanged.

## Run locally

Use Node.js 22.12 or newer and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm --filter @workspace/vantage-solutions dev
```

Open http://localhost:5173. Pages are available at `/`, `/our-work`, `/peace-of-mind`, `/privacy`, and `/local-growth`. Google Fonts requires an internet connection.

The Vite configuration defaults to port 5173 and base path `/`. Set `PORT` and `BASE_PATH` to override them. Development requests to `/api` proxy to `http://127.0.0.1:3001`; set `API_PROXY_TARGET` to use another backend.

## Contact backend

Configure `DATABASE_URL` for your PostgreSQL database in the terminal environment. Create the inquiry table before starting the API:

```sh
pnpm --filter @workspace/db push
PORT=3001 pnpm --filter @workspace/api-server dev
```

Email notifications also require `RESEND_API_KEY` and a verified sender domain. Notification addresses and the sender are defined in `artifacts/api-server/src/lib/notifyEmail.ts`. Keep credentials out of source files.

Without the API and database, contact submissions show an error and retain the visitor's input. An inquiry counts as submitted once it is stored in PostgreSQL; email notification failures are logged separately.

For deployment, route `/api` to the API service; the development proxy is not part of the static production build.

## Check and build

```sh
pnpm build
```

This checks TypeScript across the workspace and builds the website and API. Static website output is in `artifacts/vantage-solutions/dist/public`; API output is in `artifacts/api-server/dist`.

The reconstruction removes the export's Linux-only native dependency exclusions and regenerates the lockfile so installation works on macOS too. The package release-age policy is preserved.
