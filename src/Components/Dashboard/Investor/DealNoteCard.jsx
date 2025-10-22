import React from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const verdictStyles = {
  invest: {
    bg: "bg-green-100",        // subtle green
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    label: "Invest",
    textColor: "text-green-800",
  },
  consider: {
    bg: "bg-yellow-100",       // subtle yellow
    icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    label: "Considerable",
    textColor: "text-yellow-800",
  },
  do_not_invest: {
    bg: "bg-red-100",          // subtle red
    icon: <XCircle className="w-6 h-6 text-red-500" />,
    label: "Do not Invest",
    textColor: "text-red-800",
  },
};

const DealNoteCard = ({ dealNote }) => {
  const { startupName, verdict, dateGenerated } = dealNote;
  const style = verdictStyles[verdict];

  return (
    <div
      className={`w-72 rounded-2xl shadow-md ${style.bg} p-5 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden`}
    >
      {/* Startup Name */}
      <h3 className={`text-lg font-bold ${style.textColor}`}>{startupName}</h3>

      {/* Verdict */}
      <div className="flex items-center gap-2 mt-2">
        {style.icon}
        <span className={`font-semibold ${style.textColor}`}>{style.label}</span>
      </div>

      {/* Date Generated */}
      <p className={`text-xs mt-1 ${style.textColor} opacity-70`}>
        {dateGenerated}
      </p>
    </div>
  );
};

export default DealNoteCard;
