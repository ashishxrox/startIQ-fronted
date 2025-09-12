import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { fecthAllStartups } from "../../services/userService";

const StartupListingPage = () => {
  const navigate = useNavigate();

  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const loadStartups = async () => {
      try {
        const data = await fecthAllStartups();
        console.log("✅ Startups:", data);
        setStartups(data);
      } catch (error) {
        console.error("❌ Failed to load startups:", error);
      }
    };

    loadStartups();
  }, []);

  // Sample data with real logos
  const startups2 = [
    {
      id: 1,
      name: "Stripe",
      logo: "https://logo.clearbit.com/stripe.com",
      founder: "Patrick Collison",
      score: 92,
    },
    {
      id: 2,
      name: "Airbnb",
      logo: "https://logo.clearbit.com/airbnb.com",
      founder: "Brian Chesky",
      score: 89,
    },
    {
      id: 3,
      name: "Figma",
      logo: "https://logo.clearbit.com/figma.com",
      founder: "Dylan Field",
      score: 95,
    },
    {
      id: 4,
      name: "Notion",
      logo: "https://logo.clearbit.com/notion.so",
      founder: "Ivan Zhao",
      score: 88,
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        🚀 Startup Listings
      </h2>

      {/* Grid of cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {startups.map((startup) => (
            // console.log(startup.startupID)

          
          <div
            key={startup.uid}
            onClick={() => navigate(`/dashboard/${startup.startupID}`)}
            className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 cursor-pointer 
                       hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Gradient Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid2)] to-[var(--gradient-end)]"></div>

            {/* Logo */}
            <div className="flex justify-center mt-4">
              {startups2[2].logo ? (
                <div className="h-20 w-20 rounded-2xl bg-gray-50 shadow-inner flex items-center justify-center p-2 group-hover:scale-105 transition">
                  <img
                    src={startups2[2].logo}
                    alt={`${startups2[2].startupName} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-20 w-20 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
                  No Logo
                </div>
              )}
            </div>

            {/* Name + Founder */}
            <div className="mt-6 text-center">
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-[var(--gradient-mid2)] transition">
                {startup.startupName}
              </h3>
              {startup.founderName && (
                <p className="text-sm text-gray-500 mt-1">{startup.founderName}</p>
              )}
            </div>

            {/* Score Badge */}
            {startup.score !== undefined && (
              <div className="mt-6 flex justify-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full 
                                bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] 
                                text-white font-bold text-lg shadow-lg">
                  {startup.score}
                  <span className="absolute -bottom-5 text-xs text-gray-500">Score</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupListingPage;
