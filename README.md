# SaaSSkul — AI Lead Generation Platform

Production-ready SaaS website built with Next.js 14, Tailwind CSS, TypeScript, Supabase, and Stripe.

---

## 🗂 Project Structure

```
saaskul/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Homepage
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles
│   │   ├── ai-lead-engine/         # AI Lead Engine page
│   │   │   └── page.tsx
│   │   ├── services/               # Services page
│   │   │   └── page.tsx
│   │   ├── pricing/                # Pricing page
│   │   │   ├── page.tsx
│   │   │   └── PricingCard.tsx     # Client Stripe checkout card
│   │   ├── blog/                   # Blog section
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [slug]/page.tsx     # Blog post detail
│   │   ├── contact/                # Contact page
│   │   │   ├── page.tsx
│   │   │   └── ContactForm.tsx     # React Hook Form + Zod
│   │   ├── auth/
│   │   │   ├── login/              # Login page + form
│   │   │   └── signup/             # Signup page + form
│   │   ├── dashboard/              # Customer dashboard
│   │   │   └── page.tsx
│   │   └── api/                    # Backend API routes
│   │       ├── contact/route.ts    # Contact form → Resend email
│   │       └── stripe/
│   │           ├── checkout/route.ts   # Stripe checkout session
│   │           └── webhook/route.ts    # Stripe webhook handler
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Responsive navbar with dark mode
│   │   │   ├── Footer.tsx          # Footer with links
│   │   │   └── ThemeProvider.tsx   # next-themes wrapper
│   │   ├── sections/               # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CtaSection.tsx
│   │   └── ui/                     # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Textarea.tsx
│   ├── lib/
│   │   ├── utils.ts                # cn(), formatDate(), etc.
│   │   ├── supabase.ts             # Supabase client setup
│   │   ├── stripe.ts               # Stripe client + pricing plans
│   │   └── blog-data.ts            # Static blog post data
│   └── types/
│       └── index.ts                # TypeScript types
├── supabase/
│   └── schema.sql                  # Database schema + RLS policies
├── public/                         # Static assets
├── .env.example                    # Environment variable template
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## 🚀 Quick Start

### 1. Clone and install dependencies

```bash
git clone <your-repo>
cd saaskul
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local` (see **Configuration** section below).

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. In **Authentication > Providers**, enable Google and/or GitHub OAuth
4. Copy your project URL and anon key to `.env.local`

### 4. Set up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. In **Products**, create 3 products with monthly prices:
   - Starter: $29/month
   - Growth: $79/month  
   - Agency: $199/month
3. Copy the Price IDs to `.env.local`
4. Set up Stripe CLI for local webhook testing (see below)

### 5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## ⚙️ Configuration

Copy `.env.example` to `.env.local` and fill in:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_GROWTH_PRICE_ID=price_...
STRIPE_AGENCY_PRICE_ID=price_...

# Email (Resend - optional but recommended)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=hello@yourdomain.com
```

---

## 💳 Stripe Setup

### Local Webhook Testing

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret to .env.local as STRIPE_WEBHOOK_SECRET
```

### Webhook Events to Enable (Production)

In Stripe Dashboard → Webhooks, add these events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

---

## 🗄️ Database Schema

The `supabase/schema.sql` file creates:

| Table | Description |
|-------|-------------|
| `users` | Extended user profiles (linked to auth.users) |
| `leads` | Lead records with AI scoring and status |
| `automations` | Automation workflows |
| `appointments` | Booked appointments |

All tables have **Row Level Security (RLS)** enabled — users can only access their own data.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# (repeat for all env vars)

# Deploy to production
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables on Vercel

Go to your Vercel project → Settings → Environment Variables and add all variables from `.env.example`.

### Production Stripe Webhook

1. Go to Stripe Dashboard → Webhooks → Add Endpoint
2. URL: `https://yourdomain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.*`
4. Copy the signing secret to `STRIPE_WEBHOOK_SECRET` in Vercel

---

## 📧 Email Setup (Resend)

1. Create account at [resend.com](https://resend.com)
2. Verify your domain
3. Create an API key
4. Add `RESEND_API_KEY` to `.env.local`
5. Contact form submissions will be sent to `CONTACT_EMAIL`

---

## 🔑 Authentication

Authentication is handled by **Supabase Auth**, which supports:
- Email/Password
- Google OAuth
- GitHub OAuth
- Magic Link (email OTP)

To add more OAuth providers, enable them in:
Supabase Dashboard → Authentication → Providers

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` — change the `brand` color palette to match your brand.

### Fonts
Change Google Fonts imports in `src/app/globals.css`.

### Pricing Plans
Edit `src/lib/stripe.ts` — the `PRICING_PLANS` array controls all pricing page content.

### Blog Posts
For production, replace `src/lib/blog-data.ts` with a Supabase query or CMS (Contentful, Sanity, etc.).

---

## 🧪 Running Tests

```bash
npm run type-check    # TypeScript type checking
npm run lint          # ESLint
npm run build         # Production build (catches errors)
```

---

## 📊 SEO

Every page includes:
- Unique `<title>` and `<meta description>`
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (can be extended)
- Sitemap (add `next-sitemap` package for auto-generation)

---

## 🛣️ Roadmap / Extensions

- [ ] Add Supabase Realtime for live lead notifications
- [ ] Add AI chatbot widget (OpenAI/Anthropic API)
- [ ] Add email sequence builder UI
- [ ] Add Calendly/Cal.com integration for appointments
- [ ] Add team/multi-user support
- [ ] Add CSV lead import
- [ ] Add Zapier webhook integration
- [ ] Add white-label custom domain support

---

## 📄 License

MIT License — feel free to use this for commercial projects.
