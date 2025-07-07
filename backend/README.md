# Local Development

1. Start MongoDB (locally or use Atlas).
2. In the project root, create `.env`:
   - MONGODB_URI=your_mongodb_uri
   - JWT_SECRET=your_jwt_secret
   - NODE_ENV=development
3. From the root, run:
   - npm install
   - npm run dev (from root) to start both servers

# Vercel Deployment (Backend Only)

1. Deploy this backend as a separate Vercel project.
2. In Vercel dashboard for the backend project, set:
   - MONGODB_URI (your Atlas URI)
   - JWT_SECRET (secure random string)
   - NODE_ENV=production
3. The API will be available at https://<backend-project>.vercel.app/api.

## Notes

- MongoDB Atlas must be accessible from Vercel.
- See root `vercel.json` for monorepo routing.
