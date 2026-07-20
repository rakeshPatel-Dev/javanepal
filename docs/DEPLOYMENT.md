# Deployment

## Vercel (Recommended)

1. Push the repo to GitHub: `https://github.com/rakeshPatel-Dev/javanepal`
2. Go to [vercel.com](https://vercel.com) → Import Repository
3. Select the `javanepal` repo
4. Vercel auto-detects Next.js — no config needed
5. Click **Deploy**

### Build Settings (auto-detected)

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `npm run build` |
| Output Dir | `.next` |
| Install | `npm install` |

## Local Production Build

```bash
npm run build
npm run start    # → http://localhost:3000
```

## Environment Variables

None required. The app is fully static.

## OG Image

The social preview image is served from `/javanepal-whatsapp-og.png`. `metadataBase` in `app/layout.tsx` is set to `https://javanepal.vercel.app` so OG tags resolve correctly in production.

## Domain

Custom domain can be added in Vercel Dashboard → Project → Domains.
