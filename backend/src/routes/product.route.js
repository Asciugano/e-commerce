import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getWatchlist,
  updateProduct,
  addToWatchlist,
  removeToWatchlist
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/watchlist", protectedRoute, getWatchlist);
router.post("/watchlist", protectedRoute, addToWatchlist);
router.delete("/watchlist/:id", protectedRoute, removeToWatchlist);

router.post("/", protectedRoute, createProduct);
router.put("/", protectedRoute, updateProduct);
router.delete("/", protectedRoute, deleteProduct);

router.get("/", getProducts);
router.get("/:id", getProduct);
// router.get("/:name",);

export default router;
