import express from "express";
import { saveBankDetails, getUserBankDetails } from "../controllers/bankControllers.js";


const router = express.Router();

// POST: Save bank details
router.post("/save", saveBankDetails);
router.get("/user/:userId", getUserBankDetails);


export default router;
