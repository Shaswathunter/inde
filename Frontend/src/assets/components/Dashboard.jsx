import React, { useState, useMemo } from "react";
import {
  MdAccountBalance,
  MdAccountCircle,
  MdPayments,
  MdCardGiftcard,
  MdHistory,
  MdAttachMoney,
} from "react-icons/md";
import { FaBuilding, FaPowerOff, FaQrcode } from "react-icons/fa";

import DepositHistory from "./deposit";
import AccountActivation from "./AccountActivation";
import Withdrawals from "./Withdrawals";
import qrImage from "./qr.jpeg";

const Dashboard = ({ onLogout }) => {
  const session =
    JSON.parse(localStorage.getItem("session")) ||
    JSON.parse(sessionStorage.getItem("session"));

  const isAdmin = session?.role === "admin";

  const [totalDeposit, setTotalDeposit] = useState(259965);
  const [depositCount, setDepositCount] = useState(259);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showActivation, setShowActivation] = useState(false);
  const [bankForm, setBankForm] = useState({});

  const commission = useMemo(() => totalDeposit * 0.08, [totalDeposit]);
  const displayCommission = isAdmin ? commission : 0;

  const handleNewDeposit = (amount) => {
    setTotalDeposit((prev) => prev + Number(amount));
    setDepositCount((prev) => prev + 1);
  };

  const onBankChange = (e) => {
    const { name, value, files } = e.target;
    setBankForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleBankSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted Successfully");
    setSelectedCard(null);
    setBankForm({});
  };

  const isSaving = selectedCard === "Saving Accounts";
  const isCurrent = selectedCard === "Current Accounts";
  const isCorporate = selectedCard === "Corporate Accounts";
  const isUpi = selectedCard?.toLowerCase().includes("upi");

  const cards = useMemo(() => {
    const all = [
      { icon: <MdAccountCircle />, title: "Saving Accounts" },
      { icon: <MdAccountBalance />, title: "Current Accounts" },
      { icon: <FaBuilding />, title: "Corporate Accounts" },
      { icon: <FaQrcode />, title: "UPI IDs" },
      {
        icon: <MdAttachMoney />,
        title: "8% Commission",
        subtitle: `Earned: ₹${displayCommission.toFixed(2)}`,
      },
      { icon: <MdHistory />, title: "Deposit History", adminOnly: true },
      {
        icon: <MdPayments />,
        title: "Total Deposit",
        subtitle: `₹${totalDeposit.toLocaleString()}`,
        adminOnly: true,
      },
      {
        icon: <MdCardGiftcard />,
        title: "Deposit Count",
        subtitle: depositCount,
        adminOnly: true,
      },
      { icon: <MdCardGiftcard />, title: "Rewards" },
      { icon: <MdCardGiftcard />, title: "Withdrawals" },
    ];
    return all.filter((c) => (c.adminOnly ? isAdmin : true));
  }, [displayCommission, totalDeposit, depositCount, isAdmin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] pb-10">

      {/* HEADER */}
      <div className="relative flex justify-center items-center bg-white/90 p-4 shadow-lg">
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-indigo-700 text-center">
          Indepay Partner Dashboard
        </h1>
        <FaPowerOff
          onClick={onLogout}
          className="absolute right-4 text-red-500 cursor-pointer"
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => setSelectedCard(card.title)}
            className="bg-white rounded-2xl shadow-xl p-5 text-center cursor-pointer hover:scale-105 transition"
          >
            <div className="flex justify-center mb-3 text-3xl sm:text-4xl text-indigo-600">
              {card.icon}
            </div>
            <h2 className="font-bold text-sm sm:text-base">
              {card.title}
            </h2>
            {card.subtitle && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {card.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* UPI MODAL */}
      {isUpi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedCard(null)}
          />
          <div className="relative bg-white rounded-2xl p-5 w-full max-w-sm max-h-[90vh] overflow-y-auto text-center">
            <h2 className="text-lg font-bold mb-4 text-indigo-700">
              Scan UPI QR Code
            </h2>
            <img
              src={qrImage}
              alt="QR Code"
              className="w-52 sm:w-60 mx-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedCard(null)}
              className="text-red-500 mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* BANK FORM MODAL */}
      {(isSaving || isCurrent || isCorporate) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedCard(null)}
          />
          <form
            onSubmit={handleBankSubmit}
            className="relative bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
              {selectedCard} Details
            </h2>

            <div className="space-y-3">

              <input name="bankName" placeholder="Bank Name"
                onChange={onBankChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                required />

              <input name="accountNumber" placeholder="Account Number"
                onChange={onBankChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                required />

              <input name="ifsc" placeholder="IFSC Code"
                onChange={onBankChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                required />

              <input name="bankPhone" placeholder="Bank Registered Phone Number"
                onChange={onBankChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                required />

              {isSaving && (
                <>
                  <input name="atmCardNo" placeholder="ATM Card Number"
                    onChange={onBankChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required />
                  <input name="atmExpiry" placeholder="Expiry (MM/YY)"
                    onChange={onBankChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required />
                  <input type="password" name="atmCvv" placeholder="CVV"
                    onChange={onBankChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required />
                </>
              )}

              {(isCurrent || isCorporate) && (
                <>
                  <input name="username" placeholder="Net Banking Username"
                    onChange={onBankChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required />
                  <input type="password" name="password" placeholder="Net Banking Password"
                    onChange={onBankChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required />
                </>
              )}

              <div>
                <label className="text-xs font-medium block mb-1">
                  Upload QR Code
                </label>
                <input type="file" name="qrUpload"
                  accept="image/*"
                  onChange={onBankChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">
                  Upload Supporting File
                </label>
                <input type="file" name="documentUpload"
                  onChange={onBankChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>

              <button className="w-full bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white py-2 rounded-lg text-sm">
                Submit
              </button>

            </div>
          </form>
        </div>
      )}

      {/* WITHDRAWAL MODAL */}
      {selectedCard === "Withdrawals" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedCard(null)} />
          <div className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <Withdrawals
              role={session?.role}
              commission={commission}
              onClose={() => setSelectedCard(null)}
            />
          </div>
        </div>
      )}

      {/* ADMIN DEPOSIT */}
      {isAdmin && (
        <div className="mx-4 sm:mx-6 mb-8 bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-6">
          <h3 className="text-lg font-bold mb-4 text-indigo-700">
            Live Deposit History
          </h3>
          <DepositHistory
            visibleCount={6}
            onNewDeposit={handleNewDeposit}
          />
        </div>
      )}

      {/* USER ACTIVATION */}
      {!isAdmin && (
        <div className="mx-4 sm:mx-6 mb-8 bg-white/90 rounded-2xl shadow-xl p-5 text-center">
          <h3 className="text-lg font-bold mb-2 text-indigo-700">
            Account Activation
          </h3>

          <button
            onClick={() => setShowActivation(true)}
            className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#6a11cb] to-[#2575fc]"
          >
            Activate Account
          </button>

          <p className="text-xs text-gray-600 mt-2">
            Activate for earning unlocked
          </p>
        </div>
      )}

      {!isAdmin && showActivation && (
        <AccountActivation onClose={() => setShowActivation(false)} />
      )}

    </div>
  );
};

export default Dashboard;
