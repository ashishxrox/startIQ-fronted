import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react"; // small AI icon

const GreenFlagsCard = ({ flags = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] bg-clip-text text-transparent">
          Green Flags
        </h3>
        <Cpu size={16} className="text-gray-400" />
      </div>
      <p className="text-xs text-gray-400 mt-1 italic">
        Identified by AI
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Positives from an investor's perspective.
      </p>

      {/* Flags */}
      <div className="mt-4 flex flex-wrap gap-3">
        {flags.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No flags available yet.</p>
        ) : (
          flags.map((flag, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1DB233]/70 to-[#107838]/70 text-white text-sm font-medium shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {flag}
            </motion.span>
          ))
        )}
      </div>
    </div>
  );
};

export default GreenFlagsCard;
