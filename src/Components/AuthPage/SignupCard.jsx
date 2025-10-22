import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "./Firebase/authService";
import Toast from "../Utils/Toast"; 
import { Eye, EyeOff } from "lucide-react"; // ✅ eye icons

const SignupCard = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ new
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
      <div className="h-[60%] w-[65%] flex justify-start flex-col items-center gap-[30px]"
      onKeyDown={(e)=>{
            if(e.key === "Enter" && !loading){
              handleSignup()
            }
          }}
      >

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

        {/* Password with eye */}
        <div className="input-group relative w-full">
          <input
            type={showPassword ? "text" : "password"} // ✅ toggle
            className="input-field pr-10"
            required
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="input-label">Password</label>

          {/* Eye icon */}
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
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
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SignupCard;
