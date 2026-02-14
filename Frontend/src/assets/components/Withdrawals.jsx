import React, { useState } from "react";
import { MdCheckCircle } from "react-icons/md";

const Withdrawals = ({ role, commission, onClose }) => {
  const [withdrawType, setWithdrawType] = useState("BANK");
  const [amount, setAmount] = useState("");

  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    ifsc: "",
  });

  const [usdtAddress, setUsdtAddress] = useState("");

  // ✅ History with Status
  const [bankHistory, setBankHistory] = useState([
    { amount: 45000, account: "******4589", status: "success" },
    { amount: 62000, account: "******7821", status: "success" },
    { amount: 85000, account: "******9912", status: "success" },
    { amount: 120000, account: "******6654", status: "success" },
    { amount: 76000, account: "******2487", status: "success" },
    { amount: 54000, account: "******3399", status: "success" },
    { amount: 91000, account: "******8801", status: "pending" }, // ✅ Last Pending
  ]);

  const [usdtHistory, setUsdtHistory] = useState([
    { amount: 35000, wallet: "TRX8kX...91Df", status: "success" },
    { amount: 50000, wallet: "TRX7Lp...22Xa", status: "success" },
    { amount: 78000, wallet: "TRX9Zp...73Fd", status: "success" },
    { amount: 92000, wallet: "TRX5Ty...18Lp", status: "success" },
    { amount: 61000, wallet: "TRX2Qw...44Xz", status: "success" },
    { amount: 87000, wallet: "TRX6Re...55Pk", status: "pending" }, // ✅ Last Pending
  ]);

  const handleWithdraw = () => {
    if (!amount || Number(amount) < 30000) {
      alert("Minimum withdrawal amount is 30,000");
      return;
    }

    if (withdrawType === "BANK") {
      if (!bankDetails.accountNumber) {
        alert("Enter account number");
        return;
      }

      const maskedAccount =
        "XXXXXX" + bankDetails.accountNumber.slice(-4);

      setBankHistory((prev) => [
        { amount: Number(amount), account: maskedAccount, status: "pending" },
        ...prev,
      ]);

      alert("Withdrawal Request Submitted (Pending)");
    }

    if (withdrawType === "USDT") {
      if (!usdtAddress) {
        alert("Enter wallet address");
        return;
      }

      const maskedWallet =
        usdtAddress.slice(0, 6) + "..." + usdtAddress.slice(-4);

      setUsdtHistory((prev) => [
        { amount: Number(amount), wallet: maskedWallet, status: "pending" },
        ...prev,
      ]);

      alert("Withdrawal Request Submitted (Pending)");
    }

    setAmount("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <h2 className="text-xl font-bold mb-2 text-center text-indigo-700">
        Withdrawal Panel
      </h2>

      {/* ✅ 24 Hour Rule Line */}
      <p className="text-xs text-red-500 text-center mb-4">
        Only one withdrawal allowed in 24 hours.
      </p>

      <div className="grid gap-3">

        <select
          value={withdrawType}
          onChange={(e) => setWithdrawType(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="BANK">Bank Withdrawal</option>
          {role === "admin" && (
            <option value="USDT">USDT Withdrawal</option>
          )}
        </select>

        <input
          type="number"
          placeholder="Enter Amount (Min 30000)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded-lg"
        />

        {withdrawType === "BANK" && (
          <input
            placeholder="Account Number"
            className="border p-2 rounded-lg"
            value={bankDetails.accountNumber}
            onChange={(e) =>
              setBankDetails({ ...bankDetails, accountNumber: e.target.value })
            }
          />
        )}

        {withdrawType === "USDT" && role === "admin" && (
          <input
            placeholder="USDT Wallet Address"
            className="border p-2 rounded-lg"
            value={usdtAddress}
            onChange={(e) => setUsdtAddress(e.target.value)}
          />
        )}

        <button
          onClick={handleWithdraw}
          className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white py-2 rounded-lg"
        >
          Request Withdrawal
        </button>

        {/* BANK HISTORY */}
        {withdrawType === "BANK" && (
          <div className="mt-4">
            <h3 className="font-bold text-indigo-700 mb-2">
              Bank Withdrawal History
            </h3>
            <ul className="bg-gray-100 rounded-lg p-3 space-y-2">
              {bankHistory.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-white p-2 rounded shadow text-sm"
                >
                  <div>
                    <p>₹ {item.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">
                      A/C: {item.account}
                    </p>
                  </div>

                  {item.status === "success" ? (
                    <MdCheckCircle className="text-green-500 text-lg" />
                  ) : (
                    <span className="text-yellow-500 text-xs font-semibold">
                      Pending
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* USDT HISTORY */}
        {withdrawType === "USDT" && role === "admin" && (
          <div className="mt-4">
            <h3 className="font-bold text-indigo-700 mb-2">
              USDT Withdrawal History
            </h3>
            <ul className="bg-gray-100 rounded-lg p-3 space-y-2">
              {usdtHistory.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-white p-2 rounded shadow text-sm"
                >
                  <div>
                    <p>{item.amount.toLocaleString()} USDT</p>
                    <p className="text-xs text-gray-500">
                      Wallet: {item.wallet}
                    </p>
                  </div>

                  {item.status === "success" ? (
                    <MdCheckCircle className="text-green-500 text-lg" />
                  ) : (
                    <span className="text-yellow-500 text-xs font-semibold">
                      Pending
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onClose}
          className="text-red-500 mt-3"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Withdrawals;
