import express, { Router } from "express";
import mongoose, { get } from "mongoose";
import Product from "../models/product.model.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  addReview,
  updateReview,
  deleteReview,
  getProductById,
} from "../controllers/product.controller.js";
import { requireAuth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", requireAuth, isAdmin, createProduct);

router.put("/:id", requireAuth, isAdmin, updateProduct);

router.delete("/:id", requireAuth, isAdmin, deleteProduct);

router.get("/search", searchProducts);

router.post("/:id/reviews", requireAuth, addReview);
router.put("/:id/reviews", requireAuth, updateReview);
router.delete("/:id/reviews", requireAuth, deleteReview);

router.get("/:id", getProductById);

export default router;
