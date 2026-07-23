import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUser } from "../../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const data = await loginUser(formData);

      localStorage.setItem("token", data.access_token);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-indigo-700">
          Founder Networking Platform
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome Back 👋
        </p>

        <form onSubmit={handleLogin}>

          <div className="mt-8">

            <label>Email</label>

            <input
              type="email"
              className="w-full border rounded-lg p-3 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="mt-5 relative">

            <label>Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg p-3 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-4 top-11"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded-lg py-3 mt-8 hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </>
  );
}

export default LoginPage;