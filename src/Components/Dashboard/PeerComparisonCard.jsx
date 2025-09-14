import React from "react";
import { Brain, TrendingUp, Award } from "lucide-react";

const PeerComparisonCard = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 relative overflow-hidden">
      {/* AI Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
        <Brain size={14} />
        <span>AI-powered insight</span>
      </div>

      <h3 className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] bg-clip-text text-transparent">
        Peer Comparison
      </h3>
      <p className="text-sm text-gray-500 mt-2">
        How this startup stacks against similar companies.
      </p>

      {/* Comparison Table */}
      <div className="mt-6 space-y-4 relative">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[rgba(255,255,255,0.5)]  rounded-xl"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <h5 className="text-red-600 font-bold text-center text-lg">
            Not available for MVP 1
          </h5>
          <p className="text-gray-500 text-sm text-center mt-1">
            This feature will be available in a future release.
          </p>
        </div>
        {data.map((peer, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition"
          >
            {/* Left - Startup Name */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--gradient-mid2)] to-[var(--gradient-end)] flex items-center justify-center text-white font-semibold">
                {peer.name[0]}
              </div>
              <div>
                <p className="font-medium text-gray-800">{peer.name}</p>
                <p className="text-xs text-gray-500">{peer.industry}</p>
              </div>
            </div>

            {/* Middle - Metric bar */}
            <div className="flex-1 max-w-md">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${peer.score >= 70
                      ? "bg-green-500"
                      : peer.score >= 40
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                  style={{ width: `${peer.score}%` }}
                ></div>
              </div>
            </div>

            {/* Right - Score */}
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold ${peer.score >= 70
                    ? "text-green-600"
                    : peer.score >= 40
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
              >
                {peer.score}/100
              </span>
              {peer.highlight && <Award size={16} className="text-yellow-500" />}
              {peer.trending && (
                <TrendingUp size={16} className="text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeerComparisonCard;
