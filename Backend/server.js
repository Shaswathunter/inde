import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js";
import bankRoutes from "./routes/BankRoutes.js";
import activationRoutes from "./routes/ActivationRoute.js";

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bank", bankRoutes);

app.use("/api/activation", activationRoutes);

// Static folder
app.use("/uploads", express.static("uploads"));

app.get("/test", (req, res) => {
  res.json({ message: "API working ✅" });
});


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("DB Connection Error:", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
