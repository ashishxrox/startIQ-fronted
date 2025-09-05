import React from "react";
import StartupDetailsCard from "./StartupDetailsCard";
import StartupScoreCard from "./StartupScoreCard";
import GreenFlagsCard from "./GreenFlagsCard";
import RedFlagsCard from "./RedFlagsCard";

const sampleData = {
  name: "FinPay",
  logo: "https://via.placeholder.com/80",
  industry: "FinTech",
  location: "Pune, India",
  website: "https://finpay.com",
  founders: [
    {
      name: "Ashish Nair",
      email: "hidden",
      contact: "hidden",
      linkedin: "https://linkedin.com/in/example",
      bio: "Passionate about simplifying digital payments.",
    },
  ],
  overview: {
    pitch: "Making digital payments seamless for SMEs.",
    problem: "SMEs struggle with fragmented payment systems.",
    solution: "Unified API & dashboard for all transactions.",
    stage: "MVP",
    founded: "2024",
  },
}; const DashboardLayout = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left wide col */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <StartupDetailsCard data={sampleData} />
          </div>

          {/* Right col split into 3 */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <StartupScoreCard score={78} />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <GreenFlagsCard
                flags={[
                  "Strong team",
                  "Early traction",
                  "Innovative product",
                  "Scalable model",
                  "Clear market fit",
                ]}
              />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <RedFlagsCard
                flags={[
                  "High burn rate",
                  "Unproven market",
                  "Weak team experience",
                  "No clear revenue model",
                ]}
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Full Width Row 2</h3>
          <p className="text-sm text-gray-500 mt-2">
            Placeholder for larger visualization or report.
          </p>
        </div>

        {/* Row 3 */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Full Width Row 3</h3>
          <p className="text-sm text-gray-500 mt-2">
            Placeholder for metrics, activity logs, or tables.
          </p>
        </div>

        {/* Row 4 */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Full Width Row 4</h3>
          <p className="text-sm text-gray-500 mt-2">
            Placeholder for insights, charts, or extra components.
          </p>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;