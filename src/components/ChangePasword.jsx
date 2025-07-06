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
    <div className="flex justify-center items-start min-h-screen pt-20 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
        
        <label className="label">Old Password</label>
        <input
          type="password"
          className="input input-bordered w-full mb-3"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <label className="label">New Password</label>
        <input
          type="password"
          className="input input-bordered w-full mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        <button className="btn btn-primary w-full mt-4" onClick={handleSubmit}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
