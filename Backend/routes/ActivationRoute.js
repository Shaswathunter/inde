import express from "express";
import upload from "../middleware/Upload.js";
import Activation from "../models/Activation.js";

const router = express.Router();

router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    const { utr } = req.body;

    const newActivation = await Activation.create({
      userId: req.body.userId || "demoUser",
      utr,
      screenshot: req.file.path,
    });

    res.status(201).json({
      success: true,
      data: newActivation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
