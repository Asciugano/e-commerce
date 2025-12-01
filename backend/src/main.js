import express from "express";
import { config } from "dotenv";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  connectDB();
});
