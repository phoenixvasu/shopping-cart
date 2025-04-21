# 🛒 Shopping Cart Application

A modern, responsive e-commerce shopping cart application built with React, Node.js, and MongoDB. This application allows users to browse products, add items to their cart, manage quantities, and proceed to checkout.

## 🌟 Features

- **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design for all devices
  - Smooth animations and transitions
  - Loading states and error handling

- **Shopping Cart Functionality**
  - Add/remove products from cart
  - Update product quantities
  - Persistent cart storage
  - Real-time price calculations
  - Free shipping threshold

- **Product Management**
  - Browse product catalog
  - View product details
  - Admin panel for product management

- **User Experience**
  - Sticky header navigation
  - Cart badge with item count
  - Empty state handling
  - Loading indicators
  - Error messages

## 🛠️ Tech Stack

- **Frontend**
  - React 18
  - React Router v7
  - React Context API
  - React Feather Icons
  - Vite
  - CSS3 with modern features

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopping-cart.git
   cd shopping-cart
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

4. Start the development servers:
   ```bash
   # Start backend server (from root directory)
   npm start

   # Start frontend development server (from frontend directory)
   cd frontend
   npm run dev
   ```

## 📦 Project Structure

```
shopping-cart/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── styles/        # CSS styles
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── backend/               # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── controllers/       # Route controllers
└── package.json           # Project configuration
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🌐 Deployment

The application is deployed on Render:
- Frontend: [https://shopping-cart-frontend.onrender.com](https://shopping-cart-frontend.onrender.com)
- Backend: [https://shopping-cart-8.onrender.com](https://shopping-cart-8.onrender.com)

## 📝 API Documentation

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Vasu** - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React Documentation
- MongoDB Atlas
- Render for hosting
- All contributors and supporters 