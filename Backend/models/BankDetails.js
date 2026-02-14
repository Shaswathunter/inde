import mongoose from "mongoose";

const bankDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,   // 🔥 changed from ObjectId
      required: true,
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
    username: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("BankDetails", bankDetailsSchema);
