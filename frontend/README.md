# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Vercel Deployment Instructions

## Monorepo Structure

- `frontend/`: React app (Vite)
- `backend/`: Node.js/Express API

## Deployment Steps

1. Push your code to GitHub/GitLab/Bitbucket.
2. Import the project into Vercel.
3. Set the following environment variables in Vercel dashboard:
   - **Backend**: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`
   - **Frontend**: `VITE_API_URL=https://<your-vercel-app-name>.vercel.app/api`
4. Vercel will auto-detect builds:
   - Frontend: `frontend/` (output: `dist`)
   - Backend: `backend/` (entry: `server.js`)
5. After deploy, your app will be live at `https://<your-vercel-app-name>.vercel.app`.

## Notes

- All `/api/*` requests are routed to the backend.
- All other routes serve the frontend SPA.
- MongoDB Atlas is required for production DB.
