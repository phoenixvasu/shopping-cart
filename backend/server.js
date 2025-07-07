import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure CORS (must be at the very top)
const allowedOrigins = ["https://shopping-cart-uwys.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Initialize database connection
let isConnected = false;

const initializeDB = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }
};

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await initializeDB();
    res.status(200).json({
      status: "ok",
      message: "Server is healthy",
      database: isConnected ? "connected" : "disconnected",
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Routes with database initialization
app.use(
  "/api/products",
  async (req, res, next) => {
    try {
      await initializeDB();
      next();
    } catch (error) {
      next(error);
    }
  },
  productRoutes
);

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// Export for Vercel
export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => console.log("Server running on 5000"));
}
