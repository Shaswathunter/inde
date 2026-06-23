// routes/activationRoutes.js (ya jo bhi aapke router file ka naam hai)
import express from "express";
import upload from "../middlewares/Upload.js"; // Upload middleware wahi purana rahega
import Activation from "../models/Activation.js";

const router = express.Router();

router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Screenshot file is required",
      });
    }

    const { utr, userId, username } = req.body;

    // Yahan hum Database mein data create kar rahe hain
    const newActivation = await Activation.create({
      userId,
      username,
      utr,
      screenshot: req.file.path,              // Cloudinary Image URL
      screenshotPublicId: req.file.filename,  // Cloudinary Public ID (Delete karne ke liye)
      status: "pending",
    });

    res.status(201).json({
      success: true,
      data: newActivation,
    });

  } catch (error) {
    console.error("ACTIVATION ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;