import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchAllStartups, checkUserRole } from "../../services/userService";
import { motion, AnimatePresence } from "framer-motion";
import { useLoader } from "../../context/LoaderContext";
import { useToast } from "../../context/ContextToast";
import { analyseInvestorWithAI } from "../../services/investorAiService";
import AILoader from "../Utils/AILoader";

const PAGE_SIZE = 8;

const StartupListingPage = () => {
  const navigate = useNavigate();

  const [startups, setStartups] = useState([]);
  const [role, setRole] = useState(null);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();
  const [favourites, setFavourites] = useState([])

  // ✅ AI states
  const [aiLoading, setAiLoading] = useState(false);

  // 🔹 Fetch startups for a given page
  const loadStartups = async (page = 1) => {
    let loaderTimeout;

    try {
      setLoading(true);

      // ⏱️ Delay showing loader by 4s
      loaderTimeout = setTimeout(() => {
        showLoader();
      }, 4000);

      const { startups: newStartups, totalCount } = await fetchAllStartups(
        page,
        PAGE_SIZE
      );

      setStartups(newStartups);
      setTotalCount(totalCount);
      setCurrentPage(page);
    } catch (error) {
      console.error("❌ Failed to load startups:", error);
    } finally {
      // ❌ Clear loader timeout (prevents it from firing if API was quick)
      clearTimeout(loaderTimeout);

      hideLoader(); // ensure loader is hidden if it was shown
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStartups(1); // load first page by default
  }, []);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // 🔹 User auth check
  useEffect(() => {
    const localId = sessionStorage.getItem("localId");
    if (!localId) {
      showToast("Invalid Route Access", "error");
      navigate("/");
    } else {
      setUid(localId);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!uid) return;
      try {
        showLoader();
        const { role, favourites } = await checkUserRole({ uid });
        setFavourites(favourites)
        setRole(role);

        if (role !== "investor") {
          showToast("Invalid Route Access", "error");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        hideLoader();
      }
    };
    fetchUserRole();
  }, [navigate, uid]);


  useEffect(() => {
    const analyseInvestor = async () => {
      if (role == "investor") {
        try {
          setAiLoading(true)
          await analyseInvestorWithAI(uid);
        } catch (error) {
          console.error("❌ Error fetching AI analysis:", error);
        } finally {
          // hideLoader();
          setAiLoading(false)
        }

      }
    }
    analyseInvestor()
  }, [role])

  // 🔹 Render pagination numbers
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => loadStartups(i)}
          disabled={loading}
          className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer  ${currentPage === i
            ? "bg-indigo-500 text-white shadow-md"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
        {pages}
      </div>
    );
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className=" w-full h-auto flex justify-start items-center flex-row mb-10 gap-[35px]">
        <h2 className="text-3xl font-bold text-gray-800 ">
          🚀 Startup Listings
        </h2>
        {!aiLoading && <button className="btn btn-secondary flex justify-center items-center"
          onClick={() => {
            navigate('/dashboard/investor')
          }}
        >
          Dashboard
        </button>}
      </div>


      {/* Grid of cards with animation */}
      {aiLoading ? (<AILoader done={false} messages={[
        "Reviewing your investment profile and preferences...",
        "Analyzing your portfolio strategy and track record...",
        "Evaluating sector focus and deal flow alignment...",
        "Assessing portfolio synergies and founder alignment...",
        "Summarizing your investor thesis and strengths..."
      ]} />) : (<AnimatePresence mode="wait">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {startups.map((startup, index) => (
              <motion.div
                key={startup.uid}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => navigate(`/dashboard/${startup.startupID}`)}
                className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 cursor-pointer 
                  hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                {/* Heart ICon */}
                {favourites.includes(startup.startupID) && <div className="absolute top-[5px] right-[10px] w-12 h-12 mb-4 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-red-500 fill-red-500 stroke-red-500" />
                </div>}

                <div className="flex justify-center mt-4">
                  <div className="h-20 w-20 rounded-2xl bg-gray-50 shadow-inner flex items-center justify-center p-2 group-hover:scale-105 transition">
                    <img
                      alt="startup logo"
                      className="h-full w-full object-contain"
                      src="https://logo.clearbit.com/figma.com"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-500 transition">
                    {startup.startupName}
                  </h3>
                  {startup.founderName && (
                    <p className="text-sm text-gray-500 mt-1">
                      {startup.founderName}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>)}


      {/* Numbered Pagination */}
      {renderPagination()}
    </div>
  );
};

export default StartupListingPage;
