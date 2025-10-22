import React from "react";
import { MessageCircle } from "lucide-react";

const StartIQCoPilotCard = () => {
  return (
    <div className="md:w-full h-[60%] bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-2 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* Icon */}
      <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF6A6A] via-[#A375FF] to-[#5AC8FA] text-white text-2xl animate-pulse">
        <MessageCircle className="w-8 h-8" />
      </div>

      {/* Title */}
      <h2 className="text-md font-semibold text-gray-800 mb-2">
        StartIQ Co-pilot
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-2">
        Your AI-powered assistant.
      </p>

      {/* Coming Soon Badge */}
      <span className="absolute px-3 py-1 text-xs font-medium text-white bg-gray-400 rounded-full top-[5px] right-[5px]">
        Coming Soon!
      </span>
    </div>
  );
};

export default StartIQCoPilotCard;
