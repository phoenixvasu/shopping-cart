import express, { Router } from "express";
import mongoose, { get } from "mongoose";
import Product from "../models/product.model.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { requireAuth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", requireAuth, isAdmin, createProduct);

router.put("/:id", requireAuth, isAdmin, updateProduct);

router.delete("/:id", requireAuth, isAdmin, deleteProduct);

export default router;
