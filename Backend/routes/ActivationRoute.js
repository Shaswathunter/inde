import express from "express";
import upload from "../middleware/Upload.js";
import Activation from "../models/Activation.js";

const router = express.Router();

router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Screenshot file is required",
      });
    }

    const { utr, userId } = req.body;

    const newActivation = await Activation.create({
      userId: userId || "demoUser",
      utr,
      screenshot: req.file.path,
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
