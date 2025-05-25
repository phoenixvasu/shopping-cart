import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Configure CORS
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5073",
    "https://*.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ["Set-Cookie"],
};

// Apply middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ status: "ok", message: "Server is healthy" });
  } catch (error) {
    console.error("Health check failed:", error);
    res
      .status(500)
      .json({ status: "error", message: "Database connection failed" });
  }
});

// Routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  console.log("Serving static files from /frontend/dist");
  console.log(
    "Serving static files from:",
    path.join(__dirname, "/frontend/dist")
  );

  // Serve static files with proper MIME types
  app.use(
    express.static(path.join(__dirname, "/frontend/dist"), {
      setHeaders: (res, path) => {
        if (path.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        } else if (path.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
        } else if (path.endsWith(".html")) {
          res.setHeader("Content-Type", "text/html");
        }
      },
    })
  );

  // Handle all other routes by serving index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

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

// Connect to MongoDB
connectDB().catch(console.error);

// Export for Vercel
export default app;
