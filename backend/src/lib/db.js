import mongoose from "mongoose";
import { config } from "dotenv";

config();

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to mongo: ${conn.connection.host}`);
  } catch (e) {
    console.error("Error connecting to Mongo, ", e);
  }
}
