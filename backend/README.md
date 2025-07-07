# Vercel Deployment Instructions (Backend)

## Steps

1. Ensure your code is in a monorepo with `frontend/` and `backend/` at the root.
2. In Vercel dashboard, set these environment variables for the backend:
   - `MONGODB_URI` (your Atlas URI)
   - `JWT_SECRET` (secure random string)
   - `NODE_ENV=production`
3. Vercel will use `server.js` as the entry point for API routes.
4. All `/api/*` requests are routed to the backend.

## Notes

- MongoDB Atlas must be accessible from Vercel.
- See root `vercel.json` for monorepo routing.
