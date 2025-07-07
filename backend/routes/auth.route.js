import express from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, getCurrentUser);
router.get("/wishlist", requireAuth, getWishlist);
router.post("/wishlist/:productId", requireAuth, addToWishlist);
router.delete("/wishlist/:productId", requireAuth, removeFromWishlist);

export default router;
