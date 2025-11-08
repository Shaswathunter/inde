import User from "../models/User.js";

// ✅ Signup Controller
export const signupUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, username, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful ✅" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login Controller
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password ❌" });
    }

    res.status(200).json({
      message: "Login successful ✅",
      user: { name: user.name, username: user.username },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
