import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token, error, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/devices");
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="sr-only" htmlFor="email">
              Email Address
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaEnvelope className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
