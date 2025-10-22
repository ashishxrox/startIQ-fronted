import React from "react";
import FavouriteStartupCard from "./FavouriteStartupCard";

const FavouritesRow = ({ favourites }) => {
  if (!favourites || favourites.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow text-center text-gray-400">
        <h2 className="text-lg font-medium mb-2">Favourites</h2>
        <p className="text-sm">No startups marked as favourites yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-700">Favourites</h2>
        <p className="text-xs text-gray-400 italic">
          Startups marked by you as favourites
        </p>
      </div>

      {/* Horizontal Scroll Row */}
      <div className="flex gap-4 overflow-x-auto py-2">
        {favourites.map((startup, idx) => (
          <div key={idx} className="flex-shrink-0 w-72">
            <FavouriteStartupCard startup={startup} index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesRow;
