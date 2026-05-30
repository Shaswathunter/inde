import express from "express";
import { signupUser, loginUser } from "../controllers/UserControllers.js";
import expiryMiddleware from "../middleware/expiryMiddleware.js";

const router = express.Router();

router.post("/signup", expiryMiddleware, signupUser);
router.post("/login", expiryMiddleware, loginUser);

export default router;
