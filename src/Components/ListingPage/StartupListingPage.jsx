import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fecthAllStartups } from "../../services/userService";
import { motion, AnimatePresence } from "framer-motion";
import { checkUserRole } from "../../services/userService";
import { useLoader } from "../../context/LoaderContext";
import { useToast } from "../../context/ContextToast";

const PAGE_SIZE = 12;

const StartupListingPage = () => {
  const navigate = useNavigate();

  const [startups, setStartups] = useState([]);
  const [role, setRole] = useState(null);
  const [uid, setUid] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursors, setPrevCursors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();

  // 🔹 fetch page data
  const loadStartups = async (cursor = null, isNext = true) => {
    try {
      showLoader()
      const { startups: newStartups, nextCursor: newCursor, totalCount } =
        await fecthAllStartups(cursor, PAGE_SIZE);

      setStartups(newStartups);
      setNextCursor(newCursor);
      setTotalCount(totalCount);

      if (isNext && cursor) setPrevCursors((prev) => [...prev, cursor]);
      if (!isNext) setPrevCursors((prev) => prev.slice(0, -1));

      setCurrentPage(isNext ? currentPage + 1 : currentPage - 1);
    } catch (error) {
      console.error("❌ Failed to load startups:", error);
    } finally {
      hideLoader()
    }
  };

  useEffect(() => {
    loadStartups();
  }, []);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

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
        const { role, profile } = await checkUserRole({ uid });
        setRole(role);

        if (role != "investor") {
          showToast("Invalid Route Access", "error");
          navigate('/')
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        hideLoader();
      }
    }
    fetchUserRole();
  }, [navigate, uid])

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        🚀 Startup Listings
      </h2>

      {/* Grid of cards with animation */}
      <AnimatePresence mode="wait">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {startups.map((startup) => (
              <div
                key={startup.uid}
                onClick={() => navigate(`/dashboard/${startup.startupID}`)}
                className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 cursor-pointer 
                        hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                <div className="flex justify-center mt-4">
                  <div className="h-20 w-20 rounded-2xl bg-gray-50 shadow-inner flex items-center justify-center p-2 group-hover:scale-105 transition">
                    {/* <span className="text-gray-400">🚀</span> */}
                    <img alt="undefined logo" class="h-full w-full object-contain" src="https://logo.clearbit.com/figma.com"></img>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-500 transition">
                    {startup.startupName}
                  </h3>
                  {startup.founderName && (
                    <p className="text-sm text-gray-500 mt-1">{startup.founderName}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Pagination: dots + numbers */}
      {totalCount > PAGE_SIZE && (
        <div className="flex justify-center items-center gap-3 mt-10">
          {/* Prev Button */}
          <button
            onClick={() =>
              loadStartups(prevCursors[prevCursors.length - 1], false)
            }
            disabled={prevCursors.length === 0 || loading}
            className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⬅
          </button>

          {/* Page Dots + Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition ${page === currentPage
                ? "bg-indigo-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => {
                if (page < currentPage) {
                  // go back
                  let cursorIndex = prevCursors.length - (currentPage - page);
                  loadStartups(prevCursors[cursorIndex], false);
                } else if (page > currentPage) {
                  // go forward
                  loadStartups(nextCursor, true);
                }
              }}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => loadStartups(nextCursor, true)}
            disabled={!nextCursor || loading}
            className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default StartupListingPage;
