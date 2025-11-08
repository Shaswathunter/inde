import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import SignUp from "./Signup.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const BASE_URL = "https://inde-hpbc.onrender.com"; // Update when backend is deployed

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session && session.username) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.message);
        setIsLoggedIn(true);

        if (remember) {
          localStorage.setItem(
            "session",
            JSON.stringify({ username: data.user.username, name: data.user.name })
          );
        }
      } else {
        setMsg(data.message || "Invalid username or password ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("Server error ❌");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("session");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) return <Dashboard onLogout={handleLogout} />;
  if (showSignup) return <SignUp />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#6a11cb] to-[#2575fc]">
      <div className="relative w-full max-w-sm rounded-2xl bg-white/90 shadow-2xl ring-1 ring-black/5 p-6 sm:p-8">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-lg grid place-items-center text-white text-2xl">
            ₹
          </div>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-xl font-semibold text-slate-800">Indepay Partner</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage your accounts & earnings</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white font-semibold shadow-lg hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60"
          >
            {loading ? "Checking..." : "Login"}
          </button>

          {msg && (
            <p className={`text-center text-sm ${msg.includes("successful") ? "text-emerald-600" : "text-rose-600"}`}>
              {msg}
            </p>
          )}
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          New here?{" "}
          <button onClick={() => setShowSignup(true)} className="text-indigo-600 hover:underline">
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
}
