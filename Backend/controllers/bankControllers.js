export const saveBankDetails = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const data = await BankDetails.create(req.body);

    res.status(201).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("SAVE ERROR FULL:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
