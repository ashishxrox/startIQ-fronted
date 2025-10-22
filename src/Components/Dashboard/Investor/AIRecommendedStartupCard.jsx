import React from "react";
import { motion } from "framer-motion";

const gradientPresets = [
  "bg-gradient-to-r from-[#FF6A6A] via-[#FF77DD] to-[#A375FF]",
  "bg-gradient-to-r from-[#5AC8FA] via-[#A375FF] to-[#FF77DD]",
  "bg-gradient-to-r from-[#A375FF] via-[#FF6A6A] to-[#5AC8FA]",
];

const AIRecommendedStartupCard = ({ startup, index }) => {
  const { name, sector, stage, logoUrl } = startup;
  const gradient = gradientPresets[index % gradientPresets.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`w-full rounded-2xl shadow-lg ${gradient} p-6 text-white hover:scale-105 transition-transform cursor-pointer relative overflow-hidden`}
    >
      {/* Animated Glow */}
      <div className="absolute inset-0 opacity-30 animate-pulse blur-xl bg-white/20 rounded-2xl"></div>

      {/* Content */}
      <div className="relative flex flex-col md:items-center md:justify-between gap-4">
        {/* Logo / Initials */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 text-white font-bold text-xl md:text-2xl flex-shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          )}
        </div>

        {/* Name & Sector */}
        <div className="flex flex-col flex-1 text-center">
          <h3 className="text-lg md:text-xl font-bold">{name}</h3>
          <p className="text-sm md:text-base opacity-80">{sector}</p>
        </div>

        {/* Stage Badge */}
        <div>
          <span className="text-xs md:text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
            {stage}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AIRecommendedStartupCard;
