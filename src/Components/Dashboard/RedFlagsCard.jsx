import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const RedFlagsCard = ({ flags = [] }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 overflow-hidden">
      {/* Subtle animated red glow behind card */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A6A]/20 via-[#FF77DD]/20 to-[#A375FF]/20 blur-3xl opacity-50 -z-10 animate-pulse"></div>

      {/* Header */}
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-red-600">Red Flags</h3>
        <Cpu size={16} className="text-gray-400" />
      </div>
      <p className="text-xs text-gray-400 mt-1 italic">Identified by AI</p>
      <p className="text-sm text-gray-500 mt-2">
        Negatives from an investor's perspective.
      </p>

      {/* Flags */}
      <div className="mt-4 flex flex-wrap gap-3">
        {flags.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No flags available yet.</p>
        ) : (
          flags.map((flag, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium shadow-md"
              initial={{ opacity: 0, y: -10, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
            >
              {flag}
            </motion.span>
          ))
        )}
      </div>
    </div>
  );
};

export default RedFlagsCard;
