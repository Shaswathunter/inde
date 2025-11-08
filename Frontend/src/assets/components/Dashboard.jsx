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

const Dashboard = ({ onLogout }) => {
  const [totalDeposit, setTotalDeposit] = useState(459965);
  const [depositCount, setDepositCount] = useState(999);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleNewDeposit = (amount) => {
    setTotalDeposit((prev) => prev + amount);
    setDepositCount((prev) => prev + 1);
  };

  const commission = useMemo(
    () => (totalDeposit * 0.08).toFixed(2),
    [totalDeposit]
  );

  const cards = useMemo(
    () => [
      { icon: <MdAccountCircle size={40} />, title: "Saving Accounts", subtitle: "储蓄账户" },
      { icon: <MdAccountBalance size={40} />, title: "Current Accounts", subtitle: "活期账户" },
      { icon: <FaBuilding size={40} />, title: "Corporate Accounts", subtitle: "公司账户" },
      { icon: <FaQrcode size={40} />, title: "UPI IDs", subtitle: "统一支付接口" },
      { icon: <MdAttachMoney size={40} />, title: "Commission 8%", subtitle: `₹${commission}` },
      { icon: <MdPayments size={40} />, title: "Total Deposit", subtitle: `₹${totalDeposit.toLocaleString()}` },
      { icon: <MdHistory size={40} />, title: "Deposit History", subtitle: "存款历史" },
      { icon: <MdCardGiftcard size={40} />, title: "Rewards", subtitle: "奖励" },
      { icon: <MdCardGiftcard size={40} />, title: "Account Activation", subtitle: "账户激活" },
      { icon: <MdCardGiftcard size={40} />, title: "Deposit Count", subtitle: `存款次数: ${depositCount}` },
    ],
    [totalDeposit, commission, depositCount]
  );

  const [form, setForm] = useState({
    bankName: "",
    holderName: "",
    accountNo: "",
    ifsc: "",
    branch: "",
  });
  const [qrFile, setQrFile] = useState(null);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form, qrFile, type: selectedCard?.title });
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    // ✅ allow form modal for these cards
    const openFormFor = ["Saving Accounts", "Current Accounts", "Corporate Accounts"];
    if (openFormFor.includes(card.title)) {
      setSelectedCard(card);
    } else {
      setSelectedCard(card);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-r from-[#6a11cb] to-[#2575fc]">
      {/* Header */}
      <div className="w-full flex justify-center items-center bg-white p-4 text-center font-bold text-[20px]">
  <h1
    className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-transparent bg-clip-text inline-block"
    style={{
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    Indepay Partner Dashboard
  </h1>
        <span
          onClick={onLogout}
          className="absolute right-4 text-blue-500 cursor-pointer"
          title="Logout"
        >
          <FaPowerOff />
        </span>
      </div>

      {/* Cards Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-[#6a11cb] to-[#2575fc]">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className="group flex flex-col justify-center items-center rounded-2xl shadow-lg text-center border-2 border-transparent bg-white transition-all duration-300 hover:border-white hover:bg-gradient-to-r from-[#6a11cb] to-[#2575fc] cursor-pointer p-[38px_24px]"
          >
            <div className="text-4xl text-blue-900 group-hover:text-black mb-2">
              {card.icon}
            </div>
            <h2 className="text-lg font-bold text-blue-900 group-hover:text-black">
              {card.title}
            </h2>
            <p className="text-sm text-blue-800 group-hover:text-black">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Always Visible Deposit History */}
      <div className="p-6 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] rounded-3xl shadow-lg mx-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-white">Deposit History</h3>
        </div>
        <DepositHistory visibleCount={6} onNewDeposit={handleNewDeposit} />
      </div>

      {/* ==== Modals ==== */}

      {/* ✅ UPI QR Modal */}
      {selectedCard?.title === "UPI IDs" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 shadow-2xl text-center max-w-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Scan UPI QR Code
            </h2>
            <img
              src="YOUR_QR_IMAGE_URL_HERE"
              alt="UPI QR"
              className="w-56 h-56 mx-auto rounded-lg shadow-lg border border-gray-200"
            />
            <button
              onClick={() => setSelectedCard(null)}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Account Activation Modal */}
      {selectedCard?.title === "Account Activation" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Account Activation</h2>
            <p className="text-gray-700 mb-6">
              Your Indepay partner account is under verification. Once approved,
              you’ll receive an activation confirmation.
            </p>
            <button
              onClick={() => setSelectedCard(null)}
              className="px-5 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Bank Form Modal */}
      {["Saving Accounts", "Current Accounts", "Corporate Accounts"].includes(
        selectedCard?.title
      ) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          ></div>
          <form
            onSubmit={onSubmit}
            className="relative bg-white rounded-2xl p-8 shadow-2xl w-[90%] max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
              {selectedCard.title} Details
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={form.bankName}
                onChange={onChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="holderName"
                placeholder="Account Holder Name"
                value={form.holderName}
                onChange={onChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="accountNo"
                placeholder="Account Number"
                value={form.accountNo}
                onChange={onChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="ifsc"
                placeholder="IFSC Code"
                value={form.ifsc}
                onChange={onChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch Name"
                value={form.branch}
                onChange={onChange}
                className="border p-2 rounded-lg"
              />

              <input
                type="file"
                onChange={(e) => setQrFile(e.target.files[0])}
                className="border p-2 rounded-lg"
              />

              <button
                type="submit"
                className="mt-4 w-full bg-indigo-500 text-white rounded-lg py-2 font-semibold hover:bg-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
