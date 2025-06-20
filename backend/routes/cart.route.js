import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getCart,
  addOrUpdateItem,
  removeItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", requireAuth, getCart);
router.post("/add", requireAuth, addOrUpdateItem);
router.post("/remove", requireAuth, removeItem);
router.post("/clear", requireAuth, clearCart);

export default router;
