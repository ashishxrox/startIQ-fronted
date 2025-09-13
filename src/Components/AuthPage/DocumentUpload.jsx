import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DocumentUpload = () => {
  const [pitchDeck, setPitchDeck] = useState(null);
  const [financials, setFinancials] = useState(null);
  const [demoLink, setDemoLink] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const handleFileChange = (e, setter, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // File validation
    if (type === "pitch" && file.type !== "application/pdf") {
      alert("Pitch Deck must be a PDF file.");
      return;
    }
    if (
      type === "financials" &&
      !(
        file.type === "application/pdf" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      )
    ) {
      alert("Financials must be PDF or Excel file.");
      return;
    }

    setter(file);
  };

  const removeFile = (setter) => setter(null);


  const handleSubmit = async () => {
    if (!financials) {
      alert("Please upload the Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("financials", financials);


    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Upload failed: ${err.error}`);
        return;
      }

      const data = await res.json();
      console.log("LLM Insights:", data.insights);
      alert("Excel file processed successfully! Check console for insights.");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload.");
    }
  };



  return (
    <div className="h-[115vh] w-full bg-[#ebebeb] flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)] bg-clip-text text-transparent">
          Files & Media for Startup Registration
        </h2>

        {/* Pitch Deck */}
        <div className="relative space-y-2">
          {/* Blocker Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)]  rounded-xl"
          style={{backdropFilter:"blur(5px)"}}
          >
            <h5 className="text-red-600 font-bold text-center text-lg">
              Not available for MVP 1
            </h5>
            <p className="text-gray-500 text-sm text-center mt-1">
              This feature will be available in a future release.
            </p>
          </div>

          {/* Original Content */}
          <p className="font-medium text-gray-700">Pitch Deck (PDF upload)</p>
          <p className="text-sm text-gray-500">
            Core material investors expect. AI can extract slides → overview,
            market size, traction, financials.
          </p>

          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-not-allowed bg-gray-50 hover:bg-gray-50 transition"
          >
            <Upload className="mx-auto text-gray-400 mb-2" size={28} />
            <p className="text-gray-600 text-sm">Upload PDF</p>
            <input
              id="pitchDeckInput"
              type="file"
              accept="application/pdf"
              className="hidden"
              disabled
            />
          </div>

          <AnimatePresence>
            {pitchDeck && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 shadow-sm"
              >
                <span className="text-gray-800 text-sm">{pitchDeck.name}</span>
                <button
                  onClick={() => removeFile(setPitchDeck)}
                  className="p-1 rounded-full hover:bg-red-100 transition"
                >
                  <X size={18} className="text-red-500" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* Financials */}
        <div className="space-y-2">
          <p className="font-medium text-gray-700">
            Financials (Excel / PDF upload)
          </p>
          <p className="text-sm text-gray-500">
            Revenue, burn, runway, forecasts. Critical for benchmarking + risks.
          </p>

          <div
            onClick={() => document.getElementById("financialsInput").click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-transparent hover:bg-gradient-to-r hover:from-[var(--gradient-start)] hover:via-[var(--gradient-mid1)] hover:via-[var(--gradient-mid2)] hover:to-[var(--gradient-end)] transition"
          >
            <Upload className="mx-auto text-gray-400 mb-2" size={28} />
            <p className="text-gray-600 text-sm">Upload PDF / Excel</p>
            <input
              id="financialsInput"
              type="file"
              accept=".xls,.xlsx"
              className="hidden"
              onChange={(e) => handleFileChange(e, setFinancials, "financials")}
            />
          </div>

          <AnimatePresence>
            {financials && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 shadow-sm"
              >
                <span className="text-gray-800 text-sm">{financials.name}</span>
                <button
                  onClick={() => removeFile(setFinancials)}
                  className="p-1 rounded-full hover:bg-red-100 transition"
                >
                  <X size={18} className="text-red-500" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Demo Link */}
        <div className="space-y-2">
          <p className="font-medium text-gray-700">Product Demo (Video Link) <sub className="text-[#808080]">Optional</sub> </p>
          <p className="text-sm text-gray-500">
            Gives investors a feel of the product. Use YouTube/Vimeo links.
          </p>
          <input
            type="url"
            placeholder="https://youtube.com/..."
            value={demoLink}
            onChange={(e) => setDemoLink(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent focus:bg-gradient-to-r focus:from-[var(--gradient-start)] focus:via-[var(--gradient-mid1)] focus:via-[var(--gradient-mid2)] focus:to-[var(--gradient-end)] text-gray-700"
          />
        </div>

        {/* Confirmation Checkbox */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="confirmation"
            checked={confirmation}
            onChange={() => setConfirmation(!confirmation)}
            className="mt-1 w-4 h-4 border-gray-300 rounded text-[var(--gradient-start)] focus:ring-[var(--gradient-mid2)]"
          />
          <label
            htmlFor="confirmation"
            className="text-sm text-gray-600 leading-snug"
          >
            I confirm that the information and documents provided are accurate to
            the best of my knowledge.
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={!financials || !confirmation}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-medium text-white shadow-md transition ${!financials || !confirmation
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid1)] via-[var(--gradient-mid2)] to-[var(--gradient-end)]"
            }`}
        >
          Submit
        </motion.button>
      </div>
    </div>
  );
};

export default DocumentUpload;
