import React, { useState } from "react";

const Withdrawals = ({ role, commission, onClose }) => {
  const isAdmin = role === "admin";
  const balance = isAdmin ? commission : 0;

  const [amount, setAmount] = useState("");
  const [clicked, setClicked] = useState(false);

  const transactions = isAdmin
    ? [
        { amount: 20000, to: "+91 ****543210" },
        { amount: 15000, to: "+91 ****456789" },
        { amount: 10000, to: "+91 ****776655" },
        { amount: 5000, to: "+91 ****901234" },
        { amount: 10000, to: "+91 ****889977" },
        { amount: 30000, to: "+91 ****776655" },
      ]
    : [];

  const handleWithdraw = () => {
    if (isAdmin) {
      setClicked(true);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-md text-center">
      <h2 className="text-xl font-bold mb-4">Withdrawals</h2>

      {/* BALANCE */}
      <div className="flex justify-between font-semibold mb-1">
        <span>Your Balance</span>
        <span>₹{balance}</span>
      </div>

      <div className="flex justify-between text-gray-600 mb-4">
        <span>Total Commission</span>
        <span>₹{balance}</span>
      </div>

      {/* AMOUNT INPUT */}
      <input
        type="number"
        placeholder="Enter withdrawal amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded-lg mb-2 text-center"
      />

      {/* BUTTON */}
      <button
        onClick={handleWithdraw}
        disabled={!isAdmin}
        className={`w-full py-2 rounded-lg font-semibold
        ${
          isAdmin
            ? "bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Withdraw
      </button>

      {/* 🔔 DAILY LIMIT INFO (ALWAYS SHOWN FOR ADMIN) */}
      {isAdmin && (
        <p className="mt-2 text-xs text-gray-500">
          ℹ️ Only <b>1 withdrawal</b> is allowed per day.
        </p>
      )}

      {/* ❌ CLICK MESSAGE */}
      {isAdmin && clicked && (
        <p className="mt-2 text-sm text-red-500 font-medium">
          ⚠️ You have already withdrawn today.
        </p>
      )}

      {/* INFO */}
      <div className="mt-4 text-sm text-gray-600">
        <p>⏰ Withdrawal Timing: <b>10 AM – 10 PM</b></p>
        <p>💳 Methods: <b>GPay, Paytm, Bank Card</b></p>
      </div>

      {/* ADMIN TRANSACTIONS */}
      {isAdmin && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">
            Recent Withdrawals
          </h3>

          <ul className="space-y-2">
            {transactions.map((t, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg text-sm"
              >
                <span className="font-medium">
                  ₹{t.amount.toLocaleString()}
                </span>
                <span className="text-gray-600 text-xs">
                  Sent to {t.to}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="mt-4 text-sm underline text-gray-500"
      >
        Close
      </button>
    </div>
  );
};

export default Withdrawals;
