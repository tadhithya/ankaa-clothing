import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// ✅ INIT APP FIRST
const app = express();

// ✅ CONNECT DB
connectDB();

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());

// ✅ ROUTES (AFTER APP INIT)
app.use("/api/auth", authRoutes);      // 🔥 FIXED POSITION
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "API Running ✅" });
});

const PORT = process.env.PORT || 5000;

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});