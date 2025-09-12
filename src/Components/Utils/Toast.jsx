import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // trigger slide-out
      setTimeout(onClose, 300); // wait for animation to finish
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed z-[9999999] top-[10%] right-5 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-transform transform
        ${isVisible ? "animate-slide-in" : "animate-slide-out"}`}
    >
      <div className={`${typeStyles[type]} px-4 py-2 rounded-md`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
