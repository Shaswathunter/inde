import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= SIGNUP =================
export const signupUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔐 CREATE USER (ROLE AUTO-SET)
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      role: "user", // ✅ FORCE SAVE
    });

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password ❌" });
    }

    // 🔐 COMPARE HASHED PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password ❌" });
    }

    res.status(200).json({
      message: "Login successful ✅",
      user: {
        name: user.name,
        username: user.username,
        role: user.role, // 🔥 VERY IMPORTANT
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
