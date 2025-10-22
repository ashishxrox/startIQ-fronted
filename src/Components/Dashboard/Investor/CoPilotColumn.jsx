import React from "react";
import StartIQCoPilotCard from "./StartIQCoPilotCard";
import InvestorScoreCard from "./InvestorScoreCard";

const CoPilotColumn = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Investor Score Section */}
      <InvestorScoreCard score={82} />

      {/* StartIQ Co-pilot Section */}
      <StartIQCoPilotCard />
    </div>
  );
};

export default CoPilotColumn;
