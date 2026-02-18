import mongoose from "mongoose";

const activationSchema = new mongoose.Schema(
  {
    userId: String,
    utr: String,
    screenshot: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activation", activationSchema);
