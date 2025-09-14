import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002"; // ✅ adjust for your backend

export const analyseStartupWithAI = async (startupID) => {
  try {
    const res = await axios.post(`${API_BASE}/intell/analyse-with-ai`, {
      startupID,
    });

    return res.data; 
    /**
     * Expected from backend:
     * {
     *   success: true,
     *   startupID: "...",
     *   insights: "...",
     *   redFlags: [...],
     *   greenFlags: [...],
     *   score: 78
     * }
     */
  } catch (err) {
    console.error("❌ Error calling analyse-with-ai:", err);
    throw err;
  }
};
