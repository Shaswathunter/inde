import React, { useState } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import qr from "./qr.jpeg";

const AccountActivation = ({ onClose }) => {
  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [status, setStatus] = useState(null); // pending / success

  const handleSubmit = () => {
    if (!utr || !screenshot) {
      alert("Please enter UTR and upload screenshot");
      return;
    }

    console.log({ utr, screenshot });

    // After submit → show pending
    setStatus("pending");

    alert("Activation request submitted successfully ✅");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#eef4ff] rounded-3xl p-6 w-[92%] max-w-sm shadow-2xl text-center">
        
        <h2 className="text-xl font-bold text-blue-600 mb-1">
          Account Activation
        </h2>

        <p className="text-blue-500 font-semibold mb-4">
          Activation Deposit – ₹3000
        </p>

        {/* QR */}
        <div className="w-56 h-56 mx-auto mb-3 border-2 border-blue-400 rounded-xl flex items-center justify-center bg-white">
          <img src={qr} alt="UPI QR Code" className="w-54 h-54 object-contain" />
        </div>

        {/* ✅ NOTE ADDED */}
        <p className="text-xs text-gray-600 mb-4">
          ⚠️ Note: APK will be provided after deposit confirmation.
        </p>

        {/* UTR */}
        <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
          UPI Transaction ID
        </label>
        <input
          type="text"
          placeholder="UTR ID"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Screenshot */}
        <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
          Share Transaction Proof
        </label>
        <input
          type="file"
          onChange={(e) => setScreenshot(e.target.files[0])}
          className="w-full border border-gray-300 p-2 rounded-lg mb-4 bg-white"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition"
        >
          Verify Deposit
        </button>

        {/* ✅ STATUS BOX */}
        {status === "pending" && (
          <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 p-3 rounded-xl text-sm">
            <p className="font-semibold">Deposit Request Sent ✅</p>
            <p>Status: <span className="font-bold">Pending</span></p>
            <p>It will be approved within 48 hours.</p>
          </div>
        )}

        {/* NEED HELP */}
        <div className="mt-5 bg-white rounded-xl p-4 shadow-inner">
          <h3 className="font-semibold text-blue-600 mb-2">
            Need Help?
          </h3>

          <a
            href="https://t.me/indepayofficials"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-blue-500 hover:underline mb-2"
          >
            <FaTelegramPlane />
            Telegram: @indepayofficials
          </a>

          <a
            href="https://wa.me/+18076956565?text="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-green-600 hover:underline"
          >
            <FaWhatsapp />
            WhatsApp: +18076956565
          </a>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AccountActivation;
