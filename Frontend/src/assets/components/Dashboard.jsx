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
import qr from "./qr.jpeg";

const Dashboard = ({ onLogout }) => {
  const session =
    JSON.parse(localStorage.getItem("session")) ||
    JSON.parse(sessionStorage.getItem("session"));

  const isAdmin = session?.role === "admin";

  // 📊 STATES
  const [totalDeposit, setTotalDeposit] = useState(259965);
  const [depositCount, setDepositCount] = useState(259);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showActivation, setShowActivation] = useState(false);

  // 🏦 BANK FORM
  const [bankForm, setBankForm] = useState({
    bankName: "",
    holderName: "",
    accountNo: "",
    ifsc: "",
    branch: "",
  });

  const onBankChange = (e) =>
    setBankForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleBankSubmit = (e) => {
    e.preventDefault();
    console.log("Bank Details:", bankForm, selectedCard?.title);
    setSelectedCard(null);
  };

  // 💰 COMMISSION
  const commission = useMemo(
    () => (totalDeposit * 0.08).toFixed(2),
    [totalDeposit]
  );

  // 📈 LIVE DEPOSIT UPDATE
  const handleNewDeposit = (amount) => {
    setTotalDeposit((prev) => prev + amount);
    setDepositCount((prev) => prev + 1);
  };

  // 🧠 CARDS
  const cards = useMemo(() => {
    const all = [
      { icon: <MdAccountCircle />, title: "Saving Accounts" },
      { icon: <MdAccountBalance />, title: "Current Accounts" },
      { icon: <FaBuilding />, title: "Corporate Accounts" },
      { icon: <FaQrcode />, title: "UPI IDs" },

      // 🔐 ADMIN ONLY
      { icon: <MdHistory />, title: "Deposit History", adminOnly: true },
      {
        icon: <MdAttachMoney />,
        title: "Commission (8%)",
        subtitle: `₹${commission}`,
        adminOnly: true,
      },
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

      // COMMON
      { icon: <MdCardGiftcard />, title: "Rewards" },
      { icon: <MdCardGiftcard />, title: "Withdrawals" },
    ];

    return all.filter((c) => (c.adminOnly ? isAdmin : true));
  }, [commission, totalDeposit, depositCount, isAdmin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc]">
      {/* HEADER */}
      <div className="relative flex justify-center items-center bg-white/90 p-4 shadow-lg">
        <h1 className="text-xl font-bold text-indigo-700">
          Indepay Partner Dashboard
        </h1>
        <FaPowerOff
          onClick={onLogout}
          className="absolute right-5 text-red-500 cursor-pointer"
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => setSelectedCard(card)}
            className="bg-white rounded-2xl shadow-xl p-8 text-center cursor-pointer hover:scale-105 transition"
          >
            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-3 rounded-full bg-indigo-50">
              <span className="text-4xl text-indigo-600">
                {card.icon}
              </span>
            </div>
            <h2 className="font-bold">{card.title}</h2>
            {card.subtitle && (
              <p className="text-sm text-gray-600">{card.subtitle}</p>
            )}
          </div>
        ))}
      </div>

      {/* 🏦 BANK DETAILS MODAL */}
      {["Saving Accounts", "Current Accounts", "Corporate Accounts"].includes(
        selectedCard?.title
      ) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedCard(null)}
          />
          <form
            onSubmit={handleBankSubmit}
            className="relative bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              {selectedCard.title} Details
            </h2>

            <div className="grid gap-3">
              <input name="bankName" placeholder="Bank Name" onChange={onBankChange} className="border p-2 rounded-lg" />
              <input name="holderName" placeholder="Account Holder Name" onChange={onBankChange} className="border p-2 rounded-lg" />
              <input name="accountNo" placeholder="Account Number" onChange={onBankChange} className="border p-2 rounded-lg" />
              <input name="ifsc" placeholder="IFSC Code" onChange={onBankChange} className="border p-2 rounded-lg" />
              <input name="branch" placeholder="Branch Name" onChange={onBankChange} className="border p-2 rounded-lg" />

              <button className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white py-2 rounded-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 📊 DEPOSIT HISTORY MODAL (ADMIN) */}
      {isAdmin && selectedCard?.title === "Deposit History" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedCard(null)}
          />
          <div className="bg-white rounded-2xl p-6 shadow-2xl w-[95%] max-w-3xl">
            <DepositHistory
              visibleCount={10}
              onNewDeposit={handleNewDeposit}
            />
          </div>
        </div>
      )}

      {/* 🔹 WITHDRAWALS */}
      {selectedCard?.title === "Withdrawals" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedCard(null)}
          />
          <Withdrawals
            role={session?.role}
            commission={commission}
            onClose={() => setSelectedCard(null)}
          />
        </div>
      )}

      {/* 🔹 UPI QR (NO OVERLAY) */}
      {selectedCard?.title === "UPI IDs" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <h2 className="text-lg font-bold mb-3 text-center">
              Scan UPI QR
            </h2>
            <img src={qr} alt="UPI QR" className="w-56 h-56 mx-auto" />
            <button
              onClick={() => setSelectedCard(null)}
              className="mt-4 w-full py-2 rounded-lg text-white
              bg-gradient-to-r from-[#6a11cb] to-[#2575fc]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🔐 USER – ACCOUNT ACTIVATION CARD */}
      {!isAdmin && (
        <div className="mx-6 mb-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-indigo-700">
            Account Activation
          </h3>
          <p className="text-gray-600 mb-4">
            Activate your account to unlock earnings & withdrawals
          </p>
          <button
            onClick={() => setShowActivation(true)}
            className="px-6 py-2 rounded-lg font-semibold text-white
            bg-gradient-to-r from-[#6a11cb] to-[#2575fc]
            hover:scale-105 transition"
          >
            Activate Account
          </button>
        </div>
      )}

      {/* 📊 ADMIN – BOTTOM LIVE DEPOSIT HISTORY */}
      {isAdmin && (
        <div className="mx-6 mb-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6">
          <h3 className="text-2xl font-bold mb-4 text-indigo-700">
            Live Deposit History
          </h3>
          <DepositHistory
            visibleCount={6}
            onNewDeposit={handleNewDeposit}
          />
        </div>
      )}

      {/* 🔹 ACCOUNT ACTIVATION MODAL */}
      {!isAdmin && showActivation && (
        <AccountActivation onClose={() => setShowActivation(false)} />
      )}
    </div>
  );
};

export default Dashboard;
