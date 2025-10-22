import React from "react";
import AIRecommendedStartupCard from "./AIRecommendedStartupCard";

const AIRecommendedRow = ({ startups }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-700">
          AI Recommended Startups
        </h2>
        <p className="text-xs text-gray-400 italic">
          AI Generated Recommendation based on your profile & preferences
        </p>
      </div>

      {/* Horizontal Scroll Row */}
      <div className="flex gap-4 overflow-x-auto py-2">
        {startups.map((startup, idx) => (
          <div key={idx} className="flex-shrink-0 w-[19%]">
            <AIRecommendedStartupCard startup={startup} index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendedRow;
