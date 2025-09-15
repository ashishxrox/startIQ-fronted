import React from "react";

const Tooltip = ({ message, children, left }) => {
  return (
    <div className="relative group flex gap-3 ">
      {children}
      <div className={`absolute left-[${left}] -translate-x-1/2 top-[-50%] mt-2 w-max px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg`}>
        {Array.isArray(message) ? (
          <div className="flex flex-col gap-1 text-left">
            {message.map((line, idx) => (
              <p key={idx} className={idx === 0 ? "font-semibold" : ""}>
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
