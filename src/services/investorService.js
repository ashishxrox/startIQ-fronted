import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

/**
 * Add a startup to investor's favourites
 * @param {string} investorID - UID of the investor
 * @param {string} startupID - UID of the startup
 * @returns {Promise<Object>} - Response from backend
 */
export const addFavouriteStartup = async (investorID, startupID) => {
  try {
    const res = await axios.post(`${API_BASE}/investor/toggle-favorite`, {
      investorID,
      startupID,
    });

    return res.data; 
    /**
     * Expected from backend:
     * {
     *   message: "Startup <startupID> added to investor <investorID>'s favorites"
     * }
     */
  } catch (err) {
    console.error("❌ Error adding favourite startup:", err);
    throw err;
  }
};

export const fetchFavouriteStartups = async (investorID) => {
  try {
    const res = await axios.get(`${API_BASE}/investor/favourites/${investorID}`);
    return res.data.favourites; // array of { name, sector, stage, logoUrl }
  } catch (err) {
    console.error("❌ Error fetching favourite startups:", err);
    return [];
  }
};


export const fetchDealNotes = async (investorID) => {
  try {
    const res = await axios.get(`${API_BASE}/investor/deal-notes/${investorID}`);
    return res.data; // array of { startupName, verdict, dateGenerated }
  } catch (err) {
    console.error("❌ Error fetching deal notes:", err);
    return [];
  }
};


