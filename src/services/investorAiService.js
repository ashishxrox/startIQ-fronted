import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002"; // ✅ adjust for your backend

export const analyseInvestorWithAI = async (investorID) => {
  try {
    const res = await axios.post(`${API_BASE}/intell/investor/analyse-investor`, {
      investorID,
    });

    return res.data; 
  } catch (err) {
    console.error("❌ Error calling analyse-with-ai:", err);
    throw err;
  }
};

export const generateDealNote = async (investorID, startupID) => {
  try{
    const res = await axios.post(`${API_BASE}/intell/investor/generate-deal-note`, {
      investorUID : investorID,
      startupID
    })
    return res.data.dealNote
  }catch (err) {
    console.error("❌ Error calling analyse-with-ai:", err);
    throw err;
  }
}
