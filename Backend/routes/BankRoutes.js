import express from "express";
import { saveBankDetails } from "../controllers/BankControllers";

const router = express.Router();

// POST: Save bank details
router.post("/save", saveBankDetails);

export default router;
