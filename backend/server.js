import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure CORS
app.use(
  cors({
    origin: true,
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
