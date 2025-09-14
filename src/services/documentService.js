const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------- Upload Documents (Financials + Demo Link) ----------
export const uploadDocuments = async ({ financials, ytLink, startupID }) => {
  try {
    const formData = new FormData();
    formData.append("financials", financials);
    formData.append("ytLink", ytLink);
    formData.append("startupID", startupID);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`❌ Upload failed: ${err.error}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ uploadDocuments error:", error);
    throw error;
  }
};

// ---------- Check if Documents Exist ----------
export const checkDocuments = async (startupID) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/check-documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startupID }),
    });

    if (!response.ok) {
      throw new Error(`❌ Failed to check documents: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ checkDocuments error:", error);
    throw error;
  }
};
