import exporess from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { createOrder, deleteOrder, getOrder, updateOrder } from "../controllers/order.controller.js";

const router = exporess.Router();

router.get("/:id", protectedRoute, getOrder);
router.get("/", protectedRoute,)
router.post("/", protectedRoute, createOrder);
router.delete("/", protectedRoute, deleteOrder);
router.put("/", protectedRoute, updateOrder);

export default router;
