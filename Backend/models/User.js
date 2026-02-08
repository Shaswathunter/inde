import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 security best practice
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // ✅ every new signup = user
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
