// src/services/userServices.js
// const API_BASE_URL = "http://localhost:5002/users"; // 🔹 adjust if deployed
// src/services/userServices.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------- Check User Role ----------
export const checkUserRole = async ({uid, startupID}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, startupID }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { role: null, profile: null }; // user not found
      }
      throw new Error(`Failed to check role: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ checkUserRole error:", error);
    throw error;
  }
};


// ---------- Fetch all Startups ----------
export const fecthAllStartups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/all-startups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ uid }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { role: null }; // user not found
      }
      throw new Error(`Failed to Fetch startups: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ fetchstartups error:", error);
    throw error;
  }
};
