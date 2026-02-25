import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= SIGNUP =================
export const signupUser = async (req, res) => {
  try {
    let { name, username, password } = req.body;

    // 🔥 REQUIRED CHECK
    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔐 NORMALIZE USERNAME
    username = username.toLowerCase().trim();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name.trim(),
      username,
      password: hashedPassword,
      role: "user",
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
    let { username, password } = req.body;

    // 🔥 REQUIRED CHECK
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔐 NORMALIZE USERNAME

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password ❌" });
    }

    res.status(200).json({
      message: "Login successful ✅",
      user: {
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
