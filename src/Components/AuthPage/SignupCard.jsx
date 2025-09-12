import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "./Firebase/authService";
import Toast from "../Utils/Toast"; // import reusable Toast

const SignupCard = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast]       = useState(null);
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try logging in.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      await signUp(email, password);
      setToast({ message: "🎉 Signup successful!", type: "success" });

      setTimeout(() => navigate("/role-selection"), 1500);
    } catch (err) {
      console.error(err);
      setToast({ message: getErrorMessage(err.code), type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-[35px]">
      <h3 className="secondary-header">Sign Up</h3>
      <div className="h-[60%] w-[65%] flex justify-start flex-col items-center gap-[30px]">

        {/* Email */}
        <div className="input-group">
          <input
            type="email"
            className="input-field"
            required
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="input-label">Email</label>
        </div>

        {/* Password */}
        <div className="input-group">
          <input
            type="password"
            className="input-field"
            required
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="input-label">Password</label>
        </div>

        {/* Button */}
        <button
          className="btn btn-primary"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000} // configurable
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SignupCard;
