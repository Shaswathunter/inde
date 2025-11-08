import React, { useState, useEffect } from "react";
import { MdCreditCard } from "react-icons/md";
import { IoRefresh } from "react-icons/io5";
import PullToRefresh from "react-simple-pull-to-refresh";

const BANKS = [
  "HDFC Bank", "SBI Bank", "ICICI Bank", "Axis Bank",
  "Kotak Mahindra", "Yes Bank", "Punjab National Bank", "Bank of Baroda",
];
const STATUSES = ["Completed", "Pending", "Failed"];

const randomFrom = arr => arr[Math.floor(Math.random() * arr.length)];
const randBetween = (min, max) => Math.floor(Math.random() * (max - min + 1));
const maskAccount = () => `A/c ****${randBetween(1000, 9999)}`;
const formatTime = d =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const generateDeposit = () => {
  const date = new Date(Date.now() - 5000);
  return {
    id: `${Date.now()}-${randBetween(0, 9999)}`,
    timeText: formatTime(date),
    amount: randBetween(100, 15000),
    bank: randomFrom(BANKS),
    acct: maskAccount(),
    status: randomFrom(STATUSES),
  };
};

export default function DepositHistory({ visibleCount = 6, onNewDeposit }) {
  const [deposits, setDeposits] = useState(() =>
    Array.from({ length: visibleCount }).map(generateDeposit)
  );
  const [loading, setLoading] = useState(false);

  const handlePull = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newDep = generateDeposit();
    setDeposits(prev => [newDep, ...prev.slice(0, visibleCount - 1)]);
    onNewDeposit?.(newDep.amount);
    setLoading(false);
  };

  // Auto refresh every 3s
  useEffect(() => {
    const interval = setInterval(handlePull, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-xl border rounded-xl shadow-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white font-semibold">
          <div className="flex items-center gap-2">
            <span>Live Deposits</span>
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] shadow-[0_0_8px_2px_rgba(34,197,94,0.9)]"></span>
          </div>
          <button
            onClick={handlePull}
            className={`p-2 rounded-full hover:bg-white/20 transition ${loading ? "animate-spin" : ""}`}
          >
            <IoRefresh size={22} />
          </button>
        </div>

        {/* Pull to Refresh wrapper */}
        <PullToRefresh
          onRefresh={handlePull}
          resistance={2.5}
          style={{
            height: "calc(100vh - 150px)", // dynamically fits any screen
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
          }}
          pullingContent={
            <div className="text-gray-500 text-sm py-2 flex justify-center items-center gap-2">
              <IoRefresh className="animate-spin-slow text-[#6a11cb]" size={18} />
              <span>Pull down to refresh</span>
            </div>
          }
          refreshingContent={
            <div className="text-blue-600 text-sm py-2 flex justify-center items-center gap-2 animate-bounce">
              <IoRefresh size={18} className="animate-spin" />
              <span>Refreshing...</span>
            </div>
          }
        >
          <div className="overflow-y-auto min-h-[300px] sm:min-h-[400px]">
            {deposits.map((d, i) => (
              <div
                key={d.id + i}
                className="h-16 flex items-center px-4 border-b last:border-b-0 transition-transform duration-200"
              >
                <div className="w-10 flex-shrink-0 text-[#6a11cb]">
                  <MdCreditCard size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {d.bank} • <span className="font-normal text-gray-600">{d.acct}</span>
                  </div>
                  <div className="text-xs text-gray-500">{d.timeText}</div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-sm text-gray-700">
                      ₹{d.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PullToRefresh>

        {loading && (
          <div className="p-3 text-center text-sm text-gray-500 animate-pulse">
            Generating new deposit...
          </div>
        )}
      </div>
    </div>
  );
}
