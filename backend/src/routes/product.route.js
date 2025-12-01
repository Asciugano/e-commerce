import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { createProduct, deleteProduct, getProduct, getProducts, getWatchlist, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getProduct);
router.get("/", getProducts);
// router.get("/:name",);

router.post("/", protectedRoute, createProduct);
router.put("/", protectedRoute, updateProduct);
router.delete("/", protectedRoute, deleteProduct);

router.get("/watchlist", protectedRoute, getWatchlist)

export default router;
