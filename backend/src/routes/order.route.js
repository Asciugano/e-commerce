import exporess from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { createOrder, deleteOrder, getAllOrders, getOrder, updateOrder, updateOrderStatus } from "../controllers/order.controller.js";

const router = exporess.Router();

router.get("/:id", protectedRoute, getOrder);
router.get("/", protectedRoute, getAllOrders)
router.patch("/:id/status", protectedRoute, updateOrderStatus)
router.post("/", protectedRoute, createOrder);
router.delete("/", protectedRoute, deleteOrder);
router.put("/", protectedRoute, updateOrder);

export default router;
