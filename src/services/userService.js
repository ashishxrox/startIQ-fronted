// src/services/userServices.js
// const API_BASE_URL = "http://localhost:5002/users"; // 🔹 adjust if deployed
// src/services/userServices.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------- Check User Role ----------
export const checkUserRole = async ({uid, startupID}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/check-role`, {
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
export const fetchAllStartups = async (pageNumber = null, pageSize = 8) => {
  try {
    const query = new URLSearchParams();

    // Always add pageSize (default 8)
    query.append("pageSize", pageSize);

    // Only add pageNumber if provided
    if (pageNumber) query.append("pageNumber", pageNumber);

    const response = await fetch(
      `${API_BASE_URL}/users/all-startups?${query.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return { startups: [], totalCount: 0 };
      }
      throw new Error(`Failed to fetch startups: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ fetchAllStartups error:", error);
    throw error;
  }
};

// ---------- Fetch all Startup Updates ----------
export const fetchStartupUpdates = async (uid, updateContent) => {
  try {
    if (!uid) throw new Error("UID is required to fetch startup updates");

    const response = await fetch(
      `${API_BASE_URL}/users/startup-updates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          body: JSON.stringify({ uid, updateContent }),
        }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return { updates: null };
      }
      throw new Error(`Failed to fetch startup updates: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // { updates: [...] }
  } catch (error) {
    console.error("❌ fetchStartupUpdates error:", error);
    throw error;
  }
};
