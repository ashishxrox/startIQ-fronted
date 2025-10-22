import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  {
    id: 1,
    startupName: "FinTrack",
    message: "Your portfolio startup FinTrack has successfully raised Series A funding.",
    time: "2h ago",
  },
  {
    id: 2,
    startupName: "EcoDrive",
    message: "EcoDrive reached 1000 electric vehicles sold this month.",
    time: "5h ago",
  },
  {
    id: 3,
    startupName: "HealthMate",
    message: "HealthMate partnered with Apollo Hospitals to expand telemedicine reach.",
    time: "1d ago",
  },
  {
    id: 4,
    startupName: "Mate",
    message: "HealthMate partnered with Apollo Hospitals to expand telemedicine reach.",
    time: "1d ago",
  },
];

const NotificationItem = ({ notification }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer"
  >
    {/* Startup Name */}
    <p className="text-indigo-600 font-semibold text-sm mb-1">{notification.startupName}</p>

    {/* Message */}
    <p className="text-gray-500 text-sm mt-1">{notification.message}</p>

    {/* Time */}
    <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
  </motion.div>
);

const NotificationCenter = () => {
  return (
    <div className="md:w-full bg-white rounded-2xl transition-shadow flex flex-col h-[400px]">
      <div className="w-full h-auto flex justify-between items-center flex-row">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Notifications</h2>
        <p className="text-xs text-gray-400 mb-4 italic">Updates of your favourites</p>
      </div>


      <div className="overflow-y-auto flex-1 space-y-3 pr-2">
        <AnimatePresence>
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationCenter;
