import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LikeButton = ({
  size = 34,
  defaultLiked = false,
  onToggle = () => { },
}) => {
  const [liked, setLiked] = useState(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [showInitialTooltip, setShowInitialTooltip] = useState(true);

  useEffect(()=>{
    setLiked(defaultLiked)
  },[defaultLiked])

  const handleClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    onToggle(newLiked);
  };

  // 👇 Tooltip visible for first 3 seconds after mount
  useEffect(() => {
    setShowInitialTooltip(true);
    const timer = setTimeout(() => setShowInitialTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="absolute left-[18%] top-[12%] flex items-center justify-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip (shows on hover OR initially for 3s) */}
      <AnimatePresence>
        {(showTooltip || showInitialTooltip) && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute -top-9 bg-gray-900 text-white text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap pointer-events-none"
          >
            {liked ? "Remove from favourites" : "Add to favourites"}
            <motion.div
              className="absolute left-1/2 bottom-[-4px] w-2 h-2 bg-gray-900 rotate-45 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className={`flex items-center cursor-pointer justify-center rounded-full transition-all duration-300 p-2 hover:bg-gray-200`}
      >
        <Heart
          size={size}
          className={`transition-all duration-300 ${liked ? "fill-red-500 stroke-red-500" : "stroke-gray-400"
            }`}
        />
      </motion.button>
    </div>
  );
};

export default LikeButton;
