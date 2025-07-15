import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true); // 🔥 new state for skeleton
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ simulate some pre-check (replace with your real API if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 sec skeleton
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginForm) {
        const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
        dispatch(addUser(res.data.user));
        return navigate("/");
      } else {
        const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
        dispatch(addUser(res.data.data));
        return navigate("/profile");
      }
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  // ✅ Skeleton UI
  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden py-12 px-4">
        <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none" />
        <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none" />

        {/* Skeleton Card */}
        <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700 animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-6"></div>
          <div className="h-10 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-700 rounded mb-6"></div>
          <div className="h-12 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  // ✅ Main Form
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden py-12 px-4">
      <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none" />
      <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>

        {!isLoginForm && (
          <>
            <div className="mb-4">
              <label className="text-sm text-gray-300">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-300">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                required
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="text-sm text-gray-300">Email Id</label>
          <input
            type="email"
            placeholder="Email Id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-4 relative">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 pr-10"
            required
            autoComplete={isLoginForm ? "current-password" : "new-password"}
          />
          <span
            className="absolute right-3 top-[38px] text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline text-center mt-5 cursor-pointer transition duration-200"
          onClick={() => setIsLoginForm((v) => !v)}
        >
          {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
        </p>
      </form>
    </div>
  );
};

export default Login;
