import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function protectedRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res.status(401).json({ error: true, message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ error: true, message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userID).select("-password");

    if (!user)
      res.status(404).json({ error: true, message: "No user found" });

    req.user = user;
    next();
  } catch (e) {
    console.error("Error in protectedRoute: ", e);
    res.status(500).json({ error: true, message: "Inernal Server Error" });
  }
}
