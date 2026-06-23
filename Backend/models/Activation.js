import mongoose from "mongoose";

const activationSchema = new mongoose.Schema(
  {
    userId: String,
    username: String, 
    utr: String,
    screenshot: String,
    screenshotPublicId: String, // Naya field add kiya
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Activation", activationSchema);
