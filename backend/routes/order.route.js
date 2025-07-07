import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
} from "../controllers/order.controller.js";
import { requireAuth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, createOrder);
router.get("/", requireAuth, isAdmin, getOrders);
router.get("/mine", requireAuth, getMyOrders);

export default router;
