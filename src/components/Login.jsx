import axios from 'axios';
import React, { useState } from 'react';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginForm) {
        const res = await axios.post(BASE_URL + "/login", {
          emailId,
          password,
        }, { withCredentials: true });
        console.log("User data to add:", res.data.user);
        dispatch(addUser(res.data.user));
        return navigate("/");
      } else {
        const res = await axios.post(BASE_URL + "/signup", {
          firstName,
          lastName,
          emailId,
          password,
        }, { withCredentials: true });
        dispatch(addUser(res.data.data));
        return navigate("/profile");
      }
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-[90vh] pt-10 bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
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
                className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                  autoComplete="email"
                />
               

        </div>

       <div className="mb-4 relative">
  <label className="text-sm text-gray-300">Password</label>
  <input
    type={showPassword ? "text" : "password"} // 👈 toggle type
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10"
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


        {error && (
          <p className="text-red-400 text-sm text-center mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-sm text-blue-400 hover:text-blue-300 hover:underline text-center mt-5 cursor-pointer transition duration-200"
          onClick={() => setIsLoginForm((v) => !v)}
        >
          {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
        </p>
      </form>
    </div>
  );
};

export default Login;
