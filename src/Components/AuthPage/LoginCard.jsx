import React, { useState, useEffect } from "react";
import { login } from "./Firebase/authService";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../../context/ContextToast";
import { checkUserRole } from "../../services/userService";

const LoginCard = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [uid, setUid] = useState(null);


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

      // ✅ After login, Firebase usually gives uid/localId, store it if not already
      const localId = sessionStorage.getItem("localId");

      if (localId) {
        const { role } = await checkUserRole({uid:localId});
        console.log(role)
        if (role === "founder") {
          navigate("/dashboard/startup");
        } else if (role === "investor") {
          navigate("/listing-page");
        } else {
          // 🚀 new user without role → go to registration
          navigate("/role-selection");
        }
      }

      showToast("🎉 Login successful!", "success");
      // 🚀 later you can navigate here after login
    } catch (err) {
      console.error(err);
      // setToast({ message: getErrorMessage(err.code), type: "error" });
      showToast(`${getErrorMessage(err.code)}`, "error");
    }
    setLoading(false);
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-[35px]">
      <h3 className="secondary-header">Login</h3>
      <div className="h-[60%] w-[65%] flex justify-start flex-col items-center gap-[30px]">

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

        {/* Password */}
        <div className="input-group">
          <input
            type="password"
            id="password"
            className="input-field"
            required
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
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

      {/* Toast Notification */}
      {/* {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )} */}
    </div>
  );
};

export default LoginCard;
