import React, { useState } from "react";
import { login } from "./Firebase/authService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ContextToast";
import { checkUserRole } from "../../services/userService";
import { Eye, EyeOff } from "lucide-react"; // 👁 modern icons

const LoginCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again.";
      default:
        return "Login failed. Please try again.";
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);

      const localId = sessionStorage.getItem("localId");
      if (localId) {
        const { role } = await checkUserRole({ uid: localId });
        if (role === "founder") {
          navigate("/dashboard/startup");
        } else if (role === "investor") {
          navigate("/listing-page");
        } else {
          navigate("/role-selection");
        }
      }

      showToast("🎉 Login successful!", "success");
    } catch (err) {
      console.error(err);
      showToast(`${getErrorMessage(err.code)}`, "error");
    }
    setLoading(false);
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-[35px]">
      <h3 className="secondary-header">Login</h3>
      <div className="h-[60%] w-[65%] flex justify-start flex-col items-center gap-[30px]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) {
            handleLogin()
          }
        }}
      >

        {/* Email */}
        <div className="input-group">
          <input
            type="email"
            id="email"
            className="input-field"
            required
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="input-label">
            Email
          </label>
        </div>

        {/* Password with show/hide */}
        <div className="input-group relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="input-field pr-10" // add padding so text doesn’t overlap icon
            required
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>

          {/* 👁 Toggle button */}
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="w-full h-[30px]">
          <p className="paragraph cursor-pointer hover:text-[#FFD500] w-[50%]">
            Forgot your password?
          </p>
        </div>

        {/* Button */}
        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
