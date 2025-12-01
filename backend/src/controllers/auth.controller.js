import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ error: true, message: "All fields are required" });

    if (password.length <= 6)
      return res.status(400).json({ error: true, message: "The Password must be at least 6 characters" });

    const user = await User.findOne({ email });

    if (user)
      return res.status(4001).json({ error: true, message: "The email already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (!newUser)
      return res.status(400).json({ error: true, message: "Invalid data" });

    generateToken(newUser._id, res);

    await newUser.save();
    return res.status(201).json({ newUser });
  } catch (e) {
    console.error("Error in register controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
};

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ error: true, message: "Invalid credential" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ error: true, message: "Invalid credential" });

    generateToken(user._id, res);

    res.json({ user });
  } catch (e) {
    console.error("Error in login controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
};

export function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.json({ message: "Logged out successfully" });
  } catch (e) {
    console.error("Error in logout controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
};

export function check_auth(req, res) {
  res.json({ message: "check_auth" });
  try {
    res.json({ user: req.user });
  } catch (e) {
    console.error("Error in check_auth controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
};
