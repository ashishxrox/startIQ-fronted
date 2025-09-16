import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { useToast } from "../../context/ContextToast";

const WeeklyUpdateGallery = ({ updates, newUpdate, setNewUpdate }) => {
  const { showToast } = useToast();
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  useEffect(()=>{
    setNewUpdate(false)
  },[updates])

  // Handle empty data
  if (!updates || updates.length === 0) return <p>No updates yet.</p>;

  // Helper: convert Firestore timestamp to formatted date
  const formatDate = (timestamp) => {
    if (!timestamp?._seconds) return "";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800">Weekly Updates</h3>
      <p className="text-sm text-gray-500 mt-2">
        Browse past weekly updates shared by the startup.
      </p>

      {/* Gallery Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {updates.map((update, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col"
            onClick={() => setSelectedUpdate(update)}
          >
            {/* Snippet */}
            <p className="text-gray-700 text-sm line-clamp-3">
              {update.updateContent}
            </p>

            {/* Optional Image */}
            {update.image && (
              <img
                src={update.image}
                alt="Update"
                className="mt-3 h-28 w-full object-cover rounded-lg"
              />
            )}

            {/* Upload Time */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
              <Calendar size={14} />
              {formatDate(update.dateCreated)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedUpdate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setSelectedUpdate(null)}
              >
                <X size={20} />
              </button>

              {/* Content */}
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Weekly Update
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Calendar size={14} />
                {formatDate(selectedUpdate.dateCreated)}
              </div>

              <p className="text-gray-700 text-sm">
                {selectedUpdate.updateContent}
              </p>

              {selectedUpdate.image && (
                <img
                  src={selectedUpdate.image}
                  alt="Update"
                  className="mt-4 w-full h-64 object-cover rounded-lg"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeeklyUpdateGallery;
