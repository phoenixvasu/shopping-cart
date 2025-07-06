# 🛒 NexCart Shopping Cart Application

A modern, full-stack e-commerce shopping cart application built with React, Node.js, and MongoDB. NexCart offers a seamless shopping experience with a vibrant, branded UI, robust authentication, and a modular, maintainable codebase.

---

## 🌟 Features

- **Modern UI/UX**

  - NexCart color palette for consistent branding
  - Responsive design for all devices
  - Smooth animations and transitions
  - Loading states and error handling

- **Shopping Cart**

  - Add/remove products, update quantities
  - Persistent cart storage (per user)
  - Real-time price calculations
  - Free shipping threshold

- **Product Management**

  - Browse product catalog
  - View product details
  - Admin panel for product CRUD

- **Authentication**

  - Signup, login, logout
  - JWT-based session management
  - Secure password hashing

- **User Experience**
  - Sticky header navigation
  - Cart badge with item count
  - Empty state handling
  - Loading indicators and error messages

---

## 🛠️ Tech Stack

**Frontend:**

- React 18, React Router v7, Context API
- Vite, Axios, React Feather Icons, React Icons
- Modular CSS (variables, base, components, pages)

**Backend:**

- Node.js, Express.js
- MongoDB, Mongoose
- JWT, bcryptjs, dotenv

**Tooling:**

- ESLint, concurrently, nodemon, cross-env

---

## 📦 Project Structure

```
shopping-cart/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, Header, ProductCard, etc.)
│   │   ├── contexts/      # React context providers (Auth, Cart, Product)
│   │   ├── pages/         # Main pages (Home, Login, Signup, Cart, Admin)
│   │   ├── services/      # API service modules
│   │   ├── styles/        # Modular CSS (variables, base, components, etc.)
│   │   └── utils/         # Utility functions (e.g., formatCurrency)
│   └── public/            # Static assets
├── backend/               # Node.js backend
│   ├── models/            # Mongoose models (User, Product, Cart)
│   ├── routes/            # API routes (auth, products, cart)
│   └── controllers/       # Route controllers
├── package.json           # Root scripts (dev, build, start)
└── ...
```

---

## 🎨 Styling & Theming

- **NexCart Color Palette:**
  - Primary: `#E52020`
  - Secondary: `#FBA518`
  - Accent: `#F9CB43`
  - Neutral: `#A89C29`
- **Modular CSS:**
  - `variables.css`: Color palette and global variables
  - `base.css`: Typography, layout, resets
  - `components.css`: UI components (cards, buttons, messages)
  - `auth.css`, `navbar.css`, `products.css`, `admin.css`, `cart.css`: Page/component-specific styles
  - `main.css`: Imports all CSS modules

---

## ⚙️ Environment Variables

### Backend (`.env` in root):

- `MONGODB_URI` or `MONGO_URI` — MongoDB connection string (required)
- `JWT_SECRET` — Secret for JWT signing (required)
- `NODE_ENV` — `development` or `production` (optional)

### Frontend (`.env` in frontend/):

- `VITE_API_URL` — Base URL for backend API (default: `http://localhost:5000`)

---

## 🔧 Scripts

### Root

- `npm run dev` — Start both backend (with nodemon) and frontend (Vite) in development
- `npm run build` — Install dependencies and build frontend
- `npm start` — Start backend in production mode
- `npm run install-frontend` — Install frontend dependencies

### Frontend

- `npm run dev` — Start Vite dev server
- `npm run build` — Build frontend for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

### Backend

- `npm start` — Start backend in production
- `npm run dev` — Start backend with nodemon

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/shopping-cart.git
   cd shopping-cart
   ```
2. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install
   ```
3. **Set up environment variables:**
   - Create `.env` in root:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```
   - (Optional) Create `.env` in `frontend/`:
     ```
     VITE_API_URL=http://localhost:5000
     ```
4. **Start development servers:**
   ```bash
   # From root
   npm run dev
   # Or start backend and frontend separately
   npm start         # backend (from root)
   cd frontend && npm run dev   # frontend
   ```

### Troubleshooting

- If you see 500 errors, check MongoDB connection, environment variables, and that both servers are running.
- For CORS issues, ensure frontend and backend URLs match in config.

---

## 🌐 Deployment

- **Frontend:** Deploy `frontend/dist` to Vercel, Netlify, or Render.
- **Backend:** Deploy to Render, Vercel (with `vercel.json`), or any Node.js host.
- **Environment variables** must be set in your deployment platform.
- Example deployments:
  - Frontend: [https://shopping-cart-frontend.onrender.com](https://shopping-cart-frontend.onrender.com)
  - Backend: [https://shopping-cart-8.onrender.com](https://shopping-cart-8.onrender.com)

---

## 📝 API Documentation

### Auth

- `POST /api/auth/signup` — Register new user
- `POST /api/auth/login` — Login user
- `POST /api/auth/logout` — Logout user
- `GET /api/auth/me` — Get current user

### Products

- `GET /api/products` — Get all products
- `GET /api/products/:id` — Get product by ID
- `POST /api/products` — Create product (admin)
- `PUT /api/products/:id` — Update product (admin)
- `DELETE /api/products/:id` — Delete product (admin)

### Cart

- `GET /api/cart` — Get current user's cart
- `POST /api/cart` — Add/update item in cart
- `DELETE /api/cart/:itemId` — Remove item from cart
- `POST /api/cart/clear` — Clear cart

---

## 🗂️ Main Frontend Modules

- **Components:** Navbar, Header, Footer, ProductCard, CartItem, CartSummary, LoadingSpinner, ErrorMessage, ProductList
- **Pages:** Home, Login, Signup, Cart, Admin
- **Contexts:** AuthContext, CartContext, ProductContext
- **Services:** productService, cartService
- **Utils:** formatCurrency
- **Styles:** Modular CSS files in `src/styles/`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- React Documentation
- MongoDB Atlas
- Render for hosting
- All contributors and supporters
