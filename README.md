# 🛒 NexCart Shopping Cart Application

A modern, full-stack e-commerce shopping cart application built with React, Node.js, and MongoDB. NexCart offers a seamless shopping experience with a beautiful, branded UI, robust authentication, role-based access control, Stripe-powered demo payments, and a modular, maintainable codebase.

---

## 🌟 Features

- **Modern UI/UX**

  - Responsive, mobile-friendly design
  - NexCart color palette for consistent branding
  - Smooth animations and transitions
  - Beautiful product grid and detail pages
  - Clean, bold buttons and filter/search bar
  - Loading states and error handling
  - Modern admin dashboard with card grid and modal dialogs
  - Polished reviews UI with modern cards, beautiful forms, and icon actions

- **Product Catalog**

  - Browse products in a beautiful grid
  - **Product detail pages**: click "View Details" for full info, reviews, and add to cart
  - Categories and price filtering
  - Instant search with debounce
  - Stock status and management

- **Shopping Cart**

  - Add/remove products, update quantities
  - Robust logic: if a product is already in the cart, quantity increases (never exceeds stock)
  - Prevent adding more than available stock; clear error if user tries
  - Persistent cart storage (per user)
  - Real-time price calculations
  - Prevent adding out-of-stock items
  - Clear feedback for all cart actions

- **Wishlist & Favorites**

  - Heart button on product cards to add/remove from wishlist
  - Wishlist page to view all favorites
  - Wishlist badge in navbar with count
  - Fully integrated backend and frontend logic
  - Robust, beautiful, and mobile-friendly UI

- **Product Management (Admin)**

  - Admin panel for product CRUD
  - Set category, stock, and image
  - Robust role-based access
  - Robust error handling, validation, and feedback

- **Authentication & Roles**

  - Signup, login, logout
  - JWT-based session management (secure cookies)
  - Secure password hashing
  - Role-based access control (admin vs user)
  - Admin badge and UI separation
  - 403 Forbidden page for unauthorized access

- **Checkout & Payments**

  - Multi-step checkout: Address → Payment → Review
  - Stripe Elements integration (test mode only)
  - Demo payments with Stripe test cards (no real money)
  - Order confirmation and summary

- **Order History**

  - View full order history (per user)
  - See order items, address, payment status, total, and date
  - Modern, readable card layout

- **Product Reviews & Ratings**

  - Users can leave one review per product
  - Show average rating and all reviews on product detail page
  - Edit/delete your review with beautiful UI
  - Modern, accessible, and aesthetic review cards and forms

- **User Experience**

  - Sticky header navigation
  - Cart and wishlist badges with item count
  - Empty state handling
  - Loading indicators and error messages
  - Fully responsive and accessible

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
Shopping cart/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # ProductCard, ProductList, ProductDetail, Navbar, etc.
│   │   ├── contexts/      # React context providers (Auth, Cart, Product, Wishlist)
│   │   ├── pages/         # Home, Login, Signup, Cart, Admin, Forbidden, Checkout, OrderHistory, ProductDetail, Wishlist
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
  - `components.css`: UI components (cards, buttons, messages, product grid, detail, filters, reviews)
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
- `GET /api/auth/wishlist` — Get wishlist (user)
- `POST /api/auth/wishlist/:productId` — Add to wishlist
- `DELETE /api/auth/wishlist/:productId` — Remove from wishlist

### Products

- `GET /api/products` — List all products (supports category, price, search filters)
- `GET /api/products/:id` — Get product by ID (with reviews)
- `GET /api/products/search?q=...` — Search products
- `POST /api/products` — (admin) Create product
- `PUT /api/products/:id` — (admin) Update product
- `DELETE /api/products/:id` — (admin) Delete product
- `POST /api/products/:id/reviews` — Add review
- `PUT /api/products/:id/reviews` — Update review
- `DELETE /api/products/:id/reviews` — Delete review

### Cart

- `GET /api/cart` — Get current user's cart
- `POST /api/cart/add` — Add/update item (stock checked, robust logic)
- `POST /api/cart/remove` — Remove item
- `POST /api/cart/clear` — Clear cart

### Orders

- `POST /api/orders` — Place an order (Stripe payment, address, items, stock decremented)
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

### Homepage & Product Browsing

- Browse products in a beautiful grid
- Use the search bar and filters to find products by name, category, or price
- Click "View Details" to see the full product page

### Product Detail Page

- See large image, name, price, stock, category, and all reviews
- Add to cart (if in stock, robust stock logic)
- Add to wishlist (heart button)
- Leave, edit, or delete your review (one per product)
- See all reviews in a beautiful, modern card layout

### Wishlist

- Click the heart icon on any product card to add/remove from wishlist
- View your wishlist from the navbar (with badge)
- Wishlist page shows all your favorites in a beautiful grid

### Checkout & Payments

- Add items to cart, proceed to checkout
- Enter shipping address
- On payment step, use Stripe test card info (banner and copy button provided)
- Review your order and confirm
- See order confirmation and order ID

### Order History

- Click "Orders" in the navbar (when logged in)
- View all your past orders, with full details

### Admin Dashboard

- Only admins can access `/admin`
- Add, edit, or delete products with robust validation and feedback
- See all products in a modern card grid

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
- Stock and order logic is robust and race-condition safe
- Cart and wishlist logic is robust and user-friendly

---

## 🚀 UI/UX Highlights & Best Practices

- Homepage and product detail pages are visually stunning and responsive
- Product cards and detail pages use modern card layouts, gradients, and soft shadows
- Filter/search bar is beautiful and easy to use
- All actions provide instant feedback and error handling
- Fully accessible and mobile-friendly
- Reviews UI is modern, beautiful, and accessible
- Wishlist and cart badges provide instant feedback

---

## 🔄 Extensibility & Further Ideas

- Product gallery (multiple images)
- Related products on detail page
- Order detail pages
- Admin order management/history
- Email receipts and notifications
- User profile and address book
- Wishlist/favorites
- Product Q&A
- Product reviews with images
- Inventory management
- Analytics dashboard for admin
- Multi-currency support
- ...and more!

---

## ❓ Troubleshooting & FAQ

**Q: I get a 500 error when adding to cart or wishlist.**

- Make sure your MongoDB is running and your `.env` variables are correct.
- Ensure your Mongoose model names (`ref`) match exactly (case-sensitive): `Product`, `User`, etc.
- Restart your backend after any model/schema changes.

**Q: Stripe payment fails in test mode.**

- Use the test card: `4242 4242 4242 4242`, any future expiry, any CVC.
- Make sure your Stripe keys are set in both backend and frontend `.env` files.

**Q: I can't log in or access admin.**

- Make sure you seeded the admin user (`node backend/seedAdmin.js`).
- Check your JWT secret and cookie settings.

**Q: Vercel deployment issues?**

- Double-check your environment variables in the Vercel dashboard for both frontend and backend.
- MongoDB Atlas must be accessible from Vercel (IP allowlist).
- See Vercel logs for more details.

**Q: How do I reset my database?**

- Drop your collections in MongoDB Atlas or use a local MongoDB GUI.
- Reseed the admin user if needed.

---

## 🙏 Credits

- [Stripe](https://stripe.com/docs/testing) for test card info
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) for free cloud DB
- [Vercel](https://vercel.com/) for deployment

---

**NexCart** — A modern, full-stack shopping cart for your portfolio, resume, or next SaaS idea!
