import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const getColor = (score) => {
  if (score < 40) return "#FF6A6A"; // Red
  if (score < 70) return "#FFD500"; // Yellow
  return "#1DB233"; // Green
};

const InvestorScoreCard = ({ score = 0 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // animation duration in ms
    const stepTime = 15;
    const increment = score / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= score) {
        start = score;
        clearInterval(interval);
      }
      setAnimatedScore(Math.floor(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);

  const strokeColor = getColor(animatedScore);
  const radius = 50;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col items-center justify-center space-y-4">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] bg-clip-text text-transparent">
        Investor Score
      </h3>
      <div className="relative w-26 h-26">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full rotate-[-90deg]"
        >
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Circle */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - animatedScore / 100)}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - animatedScore / 100) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-gray-800">{animatedScore}</p>
          <p className="text-sm text-gray-500">/ 100</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center mt-2">
        This score is dynamically calculated by our AI evaluation model.
      </p>
    </div>
  );
};

export default InvestorScoreCard;
