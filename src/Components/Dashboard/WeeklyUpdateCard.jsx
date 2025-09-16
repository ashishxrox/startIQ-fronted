import React, { useState } from "react";
import { Image as ImageIcon, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../context/ContextToast";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import Tooltip from "../Utils/Tooltip";

const WeeklyUpdateCard = ({ uid, setNewUpdate }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      showToast("Cant upload empty update!", "error");
      return;
    }

    try {
      console.log(uid)
      if (!uid) throw new Error("UID is required to fetch startup updates");

      const response = await fetch(
        `${API_BASE_URL}/users/create-update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, updateContent: text }),
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          showToast("Problem uploading update", "error");
          return { role: null, profile: null }; // user not found
        }
        throw new Error(`Failed to check role: ${response.statusText}`);
      }

      showToast("Update added successfull", "success");
      setNewUpdate(true)
      return await response.json();
    } catch (error) {
      console.error("❌ checkUserRole error:", error);
      throw error;
    } finally {
      setSubmitted(true);
      setTimeout(() => {
        setText("");
        setImage(null);
        setSubmitted(false);
      }, 2000);
    }


  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 relative overflow-hidden">
      {/* Top badges (AI + Reminder) */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {/* AI subtle hint */}
        <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          <Sparkles size={14} />
          Weekly Update
        </div>

        {/* 🔔 Reminder badge */}
        <AnimatePresence>
          {!submitted && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
            >
              <motion.span
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              Reminder
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">Post Weekly Update</h3>
      <p className="text-sm text-gray-500 mt-2">
        Share your progress with investors and team members.
      </p>

      <div className="mt-4 space-y-4">
        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          placeholder="Write your weekly update..."
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--gradient-mid1)] focus:outline-none transition"
        />

        {/* Image Preview */}
        <AnimatePresence>
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <img
                src={image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-xl shadow-sm"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                onClick={() => setImage(null)}
              >
                Remove
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-between items-center relative">

          <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-[var(--gradient-mid2)] transition">


            {/* <ImageIcon size={18} />
              <span className="text-sm">Add image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              /> */}

          </label>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
          >
            <Send size={16} />
            Post Update
          </motion.button>
        </div>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center text-green-600 font-semibold text-lg rounded-2xl"
          >
            ✅ Update Posted!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeeklyUpdateCard;
