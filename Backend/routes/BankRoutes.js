import BankDetails from "../models/BankDetails.js";

export const saveBankDetails = async (req, res) => {
  try {
    const data = await BankDetails.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
