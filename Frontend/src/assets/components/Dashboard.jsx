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

  const [totalDeposit, setTotalDeposit] = useState(259965);
  const [depositCount, setDepositCount] = useState(259);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showActivation, setShowActivation] = useState(false);
  const [bankForm, setBankForm] = useState({});

  const commission = useMemo(
    () => totalDeposit * 0.08,
    [totalDeposit]
  );

  const handleNewDeposit = (amount) => {
    setTotalDeposit((prev) => prev + Number(amount));
    setDepositCount((prev) => prev + 1);
  };

  const onBankChange = (e) =>
    setBankForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBankSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted Successfully");
    setSelectedCard(null);
    setBankForm({});
  };

  const isSaving = selectedCard === "Saving Accounts";
  const isCurrent = selectedCard === "Current Accounts";
  const isCorporate = selectedCard === "Corporate Accounts";

  const cards = useMemo(() => {
    const all = [
      { icon: <MdAccountCircle />, title: "Saving Accounts" },
      { icon: <MdAccountBalance />, title: "Current Accounts" },
      { icon: <FaBuilding />, title: "Corporate Accounts" },
      { icon: <FaQrcode />, title: "UPI IDs" },

      { icon: <MdHistory />, title: "Deposit History", adminOnly: true },
      {
        icon: <MdAttachMoney />,
        title: "Commission (8%)",
        subtitle: `₹${commission.toFixed(2)}`,
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

      { icon: <MdCardGiftcard />, title: "Rewards" },
      { icon: <MdCardGiftcard />, title: "Withdrawals" },
    ];

    return all.filter((c) => (c.adminOnly ? isAdmin : true));
  }, [commission, totalDeposit, depositCount, isAdmin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] pb-10">

      {/* HEADER */}
      <div className="relative flex justify-center items-center bg-white/90 p-4 shadow-lg">
        <h1 className="text-lg sm:text-xl font-bold text-indigo-700 text-center">
          Indepay Partner Dashboard
        </h1>
        <FaPowerOff
          onClick={onLogout}
          className="absolute right-5 text-red-500 cursor-pointer"
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => setSelectedCard(card.title)}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center cursor-pointer hover:scale-105 transition"
          >
            <div className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 mx-auto mb-3 rounded-full bg-indigo-50">
              <span className="text-3xl sm:text-4xl text-indigo-600">
                {card.icon}
              </span>
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

      {/* DEPOSIT HISTORY (Dashboard Niche Show Hoga) */}
      {isAdmin && (
        <div className="mx-4 sm:mx-6 mb-8 bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-2xl font-bold mb-4 text-indigo-700">
            Live Deposit History
          </h3>
          <DepositHistory
            visibleCount={6}
            onNewDeposit={handleNewDeposit}
          />
        </div>
      )}

      {/* BANK FORM MODAL */}
      {(isSaving || isCurrent || isCorporate) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedCard(null)}
          />
          <form
            onSubmit={handleBankSubmit}
            className="relative bg-white rounded-2xl p-6 shadow-2xl w-full max-w-md"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
              {selectedCard} Details
            </h2>

            <div className="grid gap-3">
              <input
                name="bankName"
                placeholder="Bank Name"
                onChange={onBankChange}
                className="border p-2 rounded-lg"
                required
              />

              {isSaving && (
                <>
                  <input name="atmCardNo" placeholder="ATM Card Number" onChange={onBankChange} className="border p-2 rounded-lg" required />
                  <input name="atmExpiry" placeholder="Expiry (MM/YY)" onChange={onBankChange} className="border p-2 rounded-lg" required />
                  <input name="atmCvv" type="password" placeholder="CVV" onChange={onBankChange} className="border p-2 rounded-lg" required />
                </>
              )}

              {(isCurrent || isCorporate) && (
                <>
                  <select name="netBanking" onChange={onBankChange} className="border p-2 rounded-lg" required>
                    <option value="">Select Banking Mode</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                  <input name="username" placeholder="Net Banking Username" onChange={onBankChange} className="border p-2 rounded-lg" required />
                  <input type="password" name="password" placeholder="Net Banking Password" onChange={onBankChange} className="border p-2 rounded-lg" required />
                </>
              )}

              <button className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white py-2 rounded-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* WITHDRAWALS MODAL */}
      {selectedCard === "Withdrawals" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedCard(null)}
          />
          <div className="relative w-full max-w-md">
            <Withdrawals
              role={session?.role}
              commission={commission}
              onClose={() => setSelectedCard(null)}
            />
          </div>
        </div>
      )}

      {/* UPI QR */}
      {selectedCard === "UPI IDs" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedCard(null)}
          />
          <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center">
            <h2 className="text-lg font-bold mb-3">Scan UPI QR</h2>
            <img src={qr} alt="UPI QR" className="w-48 h-48 mx-auto" />
            <button
              onClick={() => setSelectedCard(null)}
              className="mt-4 w-full py-2 rounded-lg text-white bg-gradient-to-r from-[#6a11cb] to-[#2575fc]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* USER ACTIVATION */}
      {!isAdmin && (
        <div className="mx-4 sm:mx-6 mb-8 bg-white/90 rounded-2xl shadow-xl p-6 text-center">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-indigo-700">
            Account Activation
          </h3>
          <button
            onClick={() => setShowActivation(true)}
            className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#6a11cb] to-[#2575fc]"
          >
            Activate Account
          </button>
        </div>
      )}

      {!isAdmin && showActivation && (
        <AccountActivation onClose={() => setShowActivation(false)} />
      )}
    </div>
  );
};

export default Dashboard;
