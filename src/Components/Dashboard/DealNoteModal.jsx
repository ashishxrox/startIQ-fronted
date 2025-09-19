import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import AILoader from "../Utils/AILoader";

const verdictStyles = {
  invest: {
    bg: "from-[var(--gradient-start)] via-[var(--gradient-mid2)] to-[var(--gradient-end)]",
    icon: <CheckCircle className="w-7 h-7 text-white" />,
    label: "Invest",
  },
  consider: {
    bg: "from-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)]",
    icon: <AlertTriangle className="w-7 h-7 text-white" />,
    label: "Considerable",
  },
  do_not_invest: {
    bg: "from-[var(--gradient-start)] via-[var(--gradient-mid1)] to-[var(--gradient-mid2)]",
    icon: <XCircle className="w-7 h-7 text-white" />,
    label: "Do not Invest",
  },
};

export default function DealNoteModal({
  isOpen,
  onClose,
  startup,
  aiLoading
}) {
  const [activeTab, setActiveTab] = useState("highlights");

  if (!isOpen) return null;

  // ✅ Get verdict from startup.note
  let verdictKey = (startup?.note || "moderate").toLowerCase();
  if (verdictKey == "do not invest") {
    verdictKey = verdictKey.split(" ").join("_")
  }
  const v = verdictStyles[verdictKey] || verdictStyles.moderate;

  const tabs = [
    { id: "highlights", label: "Highlights" },
    { id: "fit", label: "Investor Fit" },
    { id: "risks", label: "Risks" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {aiLoading ? (<AILoader messages={[
        "Analyzing startup traction, stage, and sector for key highlights...",
        "Matching startup profile against your investment thesis...",
        "Evaluating potential risks and market challenges...",
        "Balancing strengths and risks to determine overall fit...",
        "Finalizing AI-generated investment recommendation..."
      ]} />) : (<motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md">
          <div>
            <h2 className="pb-5 text-3xl lg:text-5xl font-extrabold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] bg-clip-text text-transparent">
              {startup?.name}
            </h2>
            <div className="flex gap-2 mt-1 flex-wrap">
              {startup?.stage && (
                <span className="px-2.5 py-0.5 text-xs rounded-full bg-[var(--gradient-mid2)]/10 text-[var(--gradient-mid2)] font-medium">
                  {startup.stage}
                </span>
              )}
              {startup?.sector && (
                <span className="px-2.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
                  {startup.sector}
                </span>
              )}
              {startup?.location && (
                <span className="px-2.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
                  {startup.location}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Verdict */}
        <div
          className={`bg-gradient-to-r ${v.bg} flex items-center justify-center gap-3 py-4 shadow-inner`}
        >
          <div className="flex items-center gap-2 text-white text-lg font-semibold">
            {v.icon}
            <span>{v.label}</span>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center gap-6 px-6 bg-white/80 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium transition-colors duration-200 relative cursor-pointer ${activeTab === tab.id
                  ? "text-[var(--gradient-mid2)]"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--gradient-mid2)] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 min-h-[220px]">
          <AnimatePresence mode="wait">
            {activeTab === "highlights" && startup?.highlights && (
              <motion.div
                key="highlights"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-xl p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold mb-3 text-gray-800">Key Highlights</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {startup.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "fit" && startup?.fit && (
              <motion.div
                key="fit"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-xl p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold mb-3 text-gray-800">Investor Fit</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {startup.fit.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "risks" && startup?.risks && startup.risks.length > 0 && (
              <motion.div
                key="risks"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-xl p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold mb-3 text-gray-800">Risks & Watchouts</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {startup.risks.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Verdict */}
        <div className="px-6 py-5 bg-gray-50 flex items-center justify-center rounded-b-3xl">
          <span className="text-sm text-gray-800">
            AI Verdict: This startup is a <b>{v.label}</b> for you.
          </span>
        </div>
      </motion.div>)}
    </div>
  );
}
