// context/ContextLoader.js
import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)]  flex items-center justify-center z-50" style={{backdropFilter:"blur(5px)"}}>
          {/* Replace this with your custom animation */}
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
