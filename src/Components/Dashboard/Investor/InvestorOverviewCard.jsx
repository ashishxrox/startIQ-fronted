import React from "react";
import { LinkedinIcon } from "lucide-react";

const InvestorOverviewCard = ({ investor }) => {
  const {
    investorName,
    individualAngelInvestor,
    location,
    contactNumber,
    email,
    preferredSectors,
    ticketSizeRange,
    linkedin,
  } = investor || {};

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span
        className="text-gray-700 font-medium text-right truncate max-w-[180px]"
        title={value}
      >
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all overflow-hidden">
      {/* Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF6A6A] via-[#FF77DD] via-[#A375FF] to-[#5AC8FA]" />

      {/* Header */}
      <div className="mt-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{investorName}</h2>
        <p className="text-sm text-gray-500">{individualAngelInvestor}</p>
      </div>

      {/* Info Section */}
      <div className="space-y-3">
        <InfoRow label="Location" value={location} />
        <InfoRow label="Contact" value={contactNumber} />
        <InfoRow label="Email" value={email} />
        <InfoRow label="Sectors" value={preferredSectors} />
        <InfoRow label="Ticket Size" value={ticketSizeRange} />
      </div>

      {/* LinkedIn */}
      {linkedin && (
        <div className="mt-5">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#A375FF] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>View LinkedIn</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default InvestorOverviewCard;
