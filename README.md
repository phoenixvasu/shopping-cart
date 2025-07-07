# 🛒 NexCart Shopping Cart Application

A modern, full-stack e-commerce shopping cart application built with React, Node.js, and MongoDB. NexCart offers a seamless shopping experience with a vibrant, branded UI, robust authentication, role-based access control, Stripe-powered demo payments, and a modular, maintainable codebase.

---

## 🌟 Features

- **Modern UI/UX**

  - Responsive, mobile-friendly design
  - NexCart color palette for consistent branding
  - Smooth animations and transitions
  - Loading states and error handling
  - Modern admin dashboard with card grid and modal dialogs

- **Shopping Cart**

  - Add/remove products, update quantities
  - Persistent cart storage (per user)
  - Real-time price calculations
  - Free shipping threshold

- **Product Management**

  - Browse product catalog
  - View product details
  - **Admin panel for product CRUD** (role-based access)

- **Authentication & Roles**

  - Signup, login, logout
  - JWT-based session management (secure cookies)
  - Secure password hashing
  - **Role-based access control (admin vs user)**
  - Admin badge and UI separation
  - 403 Forbidden page for unauthorized access

- **Checkout & Payments**

  - Multi-step checkout: Address → Payment → Review
  - **Stripe Elements integration (test mode only)**
  - Demo payments with Stripe test cards (no real money)
  - Order confirmation and summary

- **Order History**

  - View full order history (per user)
  - See order items, address, payment status, total, and date
  - Modern, readable card layout

- **User Experience**

  - Sticky header navigation
  - Cart badge with item count
  - Empty state handling
  - Loading indicators and error messages

- **Robust Backend**
  - Express.js API with modular routes/controllers
  - Robust MongoDB connection (no race conditions)
  - Secure CORS and cookie handling
  - Admin seeding script

---

## 🛠️ Tech Stack

**Frontend:**

- React 18, React Router v7, Context API
- Vite, Axios, React Feather Icons, React Icons
- Stripe.js & @stripe/react-stripe-js
- Modular CSS (variables, base, components, pages)

**Backend:**

- Node.js, Express.js
- MongoDB, Mongoose
- JWT, bcryptjs, dotenv
- Stripe Node SDK

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
│   │   ├── pages/         # Main pages (Home, Login, Signup, Cart, Admin, Forbidden, Checkout, OrderHistory)
│   │   ├── services/      # API service modules
│   │   ├── styles/        # Modular CSS (variables, base, components, etc.)
│   │   └── utils/         # Utility functions (e.g., formatCurrency)
│   └── public/            # Static assets
├── backend/               # Node.js backend
│   ├── models/            # Mongoose models (User, Product, Cart, Order)
│   ├── routes/            # API routes (auth, products, cart, orders)
│   ├── controllers/       # Route controllers
│   ├── config/            # DB connection config
│   ├── seedAdmin.js       # Script to seed an admin user
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

- `MONGODB_URI` — MongoDB connection string (required)
- `JWT_SECRET` — Secret for JWT signing (required)
- `STRIPE_SECRET_KEY` — Stripe secret key (test mode, required for payments)
- `NODE_ENV` — `development` or `production` (optional)

### Frontend (`.env` in frontend/):

- `VITE_API_URL` — Base URL for backend API (default: `http://localhost:5000/api`)
- `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (test mode)

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
- `npm run seed-admin` — Seed an admin user (see below)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Stripe account (for test keys)

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
     STRIPE_SECRET_KEY=your_stripe_secret_key
     NODE_ENV=development
     ```
   - Create `.env` in `frontend/`:
     ```
     VITE_API_URL=http://localhost:5000/api
     VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
     ```
4. **Start development servers:**
   ```bash
   # From root
   npm run dev
   # Or start backend and frontend separately
   cd backend && npm run dev   # backend
   cd frontend && npm run dev  # frontend
   ```

### Seeding an Admin User

To create an admin user (e.g., for first-time setup):

```bash
cd backend
node seedAdmin.js
```

- This will create an admin with:
  - Name: Vasu Nandan
  - Email: vasu@admin.com
  - Password: vasuadmin
  - Role: admin
- If the user already exists, the script will not create a duplicate.

---

## 💳 Stripe Test Payments (Demo Mode)

- **No real money is moved.**
- Use Stripe test card: `4242 4242 4242 4242`, any future expiry, any CVC.
- All payments are processed in Stripe test mode.
- The checkout flow is multi-step: Address → Payment → Review → Confirmation.
- A prominent banner and copy button are shown in the payment step for test card info.
- If you enter an invalid card, a custom error message will prompt you to use the test card.

---

## 📜 API Endpoints (Key)

### Auth

- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Get current user info

### Products

- `GET /api/products` — List all products
- `POST /api/products` — (admin) Create product
- `PUT /api/products/:id` — (admin) Update product
- `DELETE /api/products/:id` — (admin) Delete product

### Cart

- `GET /api/cart` — Get current user's cart
- `POST /api/cart/add` — Add/update item
- `POST /api/cart/remove` — Remove item
- `POST /api/cart/clear` — Clear cart

### Orders

- `POST /api/orders` — Place an order (Stripe payment, address, items)
- `GET /api/orders/mine` — Get current user's order history
- `GET /api/orders` — (admin) Get all orders

---

## 🧑‍💻 Usage Instructions

### Local Development

- Start MongoDB (locally or use Atlas)
- Set up `.env` files as above
- Run `npm run dev` from root
- Access frontend at `http://localhost:5173`
- Access backend at `http://localhost:5000/api`

### Checkout & Payments

- Add items to cart, proceed to checkout
- Enter shipping address
- On payment step, use Stripe test card info (banner and copy button provided)
- Review your order and confirm
- See order confirmation and order ID

### Order History

- Click "Orders" in the navbar (when logged in)
- View all your past orders, with full details

---

## 🌐 Deployment (Vercel)

### Monorepo Structure

- `frontend/`: React app (Vite)
- `backend/`: Node.js/Express API

### Deployment Steps

1. Push your code to GitHub/GitLab/Bitbucket.
2. Import the project into Vercel.
3. Set the following environment variables in Vercel dashboard:
   - **Backend**: `MONGODB_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `NODE_ENV=production`
   - **Frontend**: `VITE_API_URL=https://<your-backend-vercel-app>.vercel.app/api`, `VITE_STRIPE_PUBLISHABLE_KEY`
4. Vercel will auto-detect builds:
   - Frontend: `frontend/` (output: `dist`)
   - Backend: `backend/` (entry: `server.js`)
5. After deploy, your app will be live at `https://<your-frontend-vercel-app>.vercel.app`.

---

## 🛡️ Security & Robustness

- All routes that access MongoDB are protected by DB initialization middleware (no race conditions)
- Secure CORS and cookie handling for cross-origin requests
- JWT-based authentication with secure cookies
- Passwords are hashed with bcrypt
- Role-based access control for admin features

---

## 🚀 Advanced Feature Suggestions

- Order detail pages (click to expand)
- Admin order management/history
- Email receipts and notifications
- User profile and address book
- Product search and filtering
- Wishlist/favorites
- Product reviews and ratings
- Inventory management
- Analytics dashboard for admin
- Multi-currency support
- ...and more!

---

## 🙏 Credits

- [Stripe](https://stripe.com/docs/testing) for test card info
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) for free cloud DB
- [Vercel](https://vercel.com/) for deployment

---

**NexCart** — A modern, full-stack shopping cart for your portfolio, resume, or next SaaS idea!
