import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/profile/password`,
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      setMessage(res.data);
      setError("");
    } catch (err) {
      setMessage("");
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen flex items-start justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden px-4 pt-24 pb-10">
      {/* ✨ Decorative gradient bars */}
      <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>
      <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>

      {/* 🔒 Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700 p-8">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          Change Password
        </h2>

        {/* Old password */}
        <label className="text-sm text-gray-300">Old Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 mt-1 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        {/* New password */}
        <label className="text-sm text-gray-300">New Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 mt-1 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Messages */}
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-400 text-sm mb-2">{message}</p>}

        {/* Button */}
        <button
          className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
          onClick={handleSubmit}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
