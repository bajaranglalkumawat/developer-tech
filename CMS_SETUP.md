# Admin CMS Setup

## 1. Install dependencies

```bash
pnpm install
```

## 2. Configure env

Copy `.env.example` to `.env` and update values.

Important:
- `MONGODB_URI` should point to MongoDB Atlas/local MongoDB
- `JWT_SECRET` should be long random secret
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used by bootstrap route

## 3. Bootstrap first admin user

Start app and call:

```bash
curl -X POST http://localhost:8080/api/auth/bootstrap
```

This works once when no admin exists.

## 4. Run app

```bash
pnpm dev
```

## 5. Admin routes
- `/admin/login`
- `/admin/dashboard`
- `/admin/blogs`
- `/admin/blog/create`
- `/admin/contacts`
- `/admin/settings`

## 6. Deployment

### Frontend (Vercel)
- Build command: `pnpm build`
- Output directory: `dist/spa`

### Backend (Render)
- Start command: `pnpm start`
- Add all `.env` variables in Render dashboard

### Database
- Use MongoDB Atlas connection string in `MONGODB_URI`

## 7. SEO + CMS features included
- Dynamic `sitemap.xml` endpoint from published blogs
- Dynamic `robots.txt` endpoint
- Canonical/OG/Twitter tags via `SEO` component
- JSON-LD schema support for blog posts
- Clean blog URLs (`/blog/:slug`)
