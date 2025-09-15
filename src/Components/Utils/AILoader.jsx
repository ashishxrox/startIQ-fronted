import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// const messages = [
//   "🤖 AI is analyzing this startup...",
//   "📊 Crunching numbers and financials...",
//   "🔍 Reviewing strengths and weaknesses...",
//   "🚀 Finding growth opportunities...",
//   "✨ Almost there... preparing insights!"
// ];

const AILoader = ({ done, messages }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // Fake progress bar logic (cap at 90% until API resolves)
  useEffect(() => {
    let interval;
    if (!done) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90; // stop at 90 until API resolves
          return prev + 2;
        });
      }, 300);
    } else {
      setProgress(100); // ✅ complete when API is done
    }
    return () => clearInterval(interval);
  }, [done]);

  // Cycle through messages
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(msgInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-4"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
      </div>

      {/* Animated message */}
      <motion.p
        key={messageIndex}
        className="text-gray-700 text-lg font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {messages[messageIndex]}
      </motion.p>
    </div>
  );
};

export default AILoader;
