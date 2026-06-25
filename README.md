# Digital Life Lessons

A full-stack platform for creating, storing, and sharing meaningful life lessons. Built with Next.js, MongoDB, Better Auth, and Stripe.

## Live URL

Add your deployed URL here after deployment.

## Key Features

- Better Auth email/password + Google login
- Create, edit, delete life lessons with categories and emotional tones
- Public lesson browsing with search, filter, sort, and pagination
- Premium lesson gating with Stripe one-time payment (৳1,500)
- Favorites, likes, comments, and lesson reporting
- User dashboard with analytics overview
- Admin dashboard for users, lessons, featured content, and moderation
- Neo-brutalist responsive UI with framer-motion animations

## NPM Packages Used

- `next`, `react`, `react-dom`
- `better-auth`
- `mongodb`
- `stripe`
- `framer-motion`
- `lucide-react`
- `react-hot-toast`
- `react-share`
- `react-countup`
- `react-intersection-observer`
- `recharts`
- `lenis`
- `tailwindcss`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `MONGODB_URI`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Setup

Promote a user to admin in MongoDB:

```js
db.user.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

## Stripe Webhook

Point Stripe webhook to `/api/webhooks/stripe` for `checkout.session.completed`.
