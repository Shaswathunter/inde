import mongoose from "mongoose";

const screenshotSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Screenshot", screenshotSchema);