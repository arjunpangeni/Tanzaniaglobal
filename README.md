# Tanzania Global Ltd

Study-abroad website for a Dar es Salaam educational consultancy. Next.js App Router, English/Swahili, shadcn + Magic UI motion, MongoDB, Auth.js admin.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Marketing pages work without MongoDB (seed content). Forms and the CMS need `MONGODB_URI`.

## Environment

See `.env.example`. You will need:

- MongoDB Atlas connection string
- Google OAuth client (Web) with callback `/api/auth/callback/google`
- `ADMIN_EMAILS` — comma-separated Gmail addresses allowed into `/admin`
- Cloudinary (optional) for blog/university image uploads
- `NEXT_PUBLIC_WHATSAPP` — digits only, e.g. `255700000000`
- `NEXT_PUBLIC_HERO_VIDEO_URL` — mp4 for the homepage hero (poster is used on mobile and reduced-motion)

```bash
npx tsx scripts/seed.ts
```

## Routes

Public: `/` `/services` `/universities` `/resources` `/about` `/contact` `/appointment` plus `/sw/...` for Swahili.

Admin: `/admin` (Google allow-list).
