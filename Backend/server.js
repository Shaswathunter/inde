import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/UserRoutes.js";
import bankRoutes from "./routes/BankRoutes.js";
import activationRoutes from "./routes/ActivationRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================== FIXED UPLOADS FOLDER ==================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");

// Create uploads folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static uploads folder

// ===========================================================

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/activation", activationRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("DB Connection Error:", err));

// Start server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🚀`)
);
