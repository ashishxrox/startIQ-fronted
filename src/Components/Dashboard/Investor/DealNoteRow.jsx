import React from "react";
import DealNoteCard from "./DealNoteCard";

const DealNotesRow = ({ dealNotes, notesLeft, daysLeft }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-700">Recent Deal Notes</h2>
        <div className="text-xs text-gray-500 italic">
          {notesLeft} deal notes left this week • {daysLeft} days until new notes
        </div>
      </div>

      {/* Cards Row */}
      {dealNotes && dealNotes.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto py-2">
          {dealNotes.map((note, idx) => (
            <div key={idx} className="flex-shrink-0">
              <DealNoteCard dealNote={note} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-6">
          No deal notes generated yet.
        </p>
      )}
    </div>
  );
};

export default DealNotesRow;
