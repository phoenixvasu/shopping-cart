import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import cors from "cors";

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
    "https://shopping-cart-frontend.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware before other middleware
app.use(cors(corsOptions));

// Other middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  console.log("Serving static files from /frontend/dist");
  console.log(
    "Serving static files from:",
    path.join(__dirname, "/frontend/dist")
  );

  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});
