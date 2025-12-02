import exporess from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { createOrder, deleteOrder, getOrder, updateOrder } from "../controllers/order.controller.js";

const router = exporess.Router();

router.post("/:id", protectedRoute, getOrder);
router.post("/", protectedRoute, createOrder);
router.delete("/", protectedRoute, deleteOrder);
router.put("/", protectedRoute, updateOrder);

export default router;
