import express from "express";
import { check_auth, login, logout, register } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protectedRoute, logout);
router.post("/register", register);
router.get("/check-auth", protectedRoute, check_auth);

export default router;
