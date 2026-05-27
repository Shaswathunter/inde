import express from "express";
import { signupUser, loginUser } from "../controllers/UserControllers.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/logi", loginUser);

export default router;
