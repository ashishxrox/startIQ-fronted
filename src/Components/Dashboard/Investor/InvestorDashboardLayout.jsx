import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../../context/LoaderContext";
import { useToast } from "../../../context/ContextToast";
import { checkUserRole } from "../../../services/userService";
import { fetchFavouriteStartups } from "../../../services/investorService";
import { fetchDealNotes } from "../../../services/investorService";
import BackButton from "../../Utils/BackButton";

import InvestorOverviewCard from "./InvestorOverviewCard";
import NotificationCenter from "./NotificationCenter";
import AIRecommendedRow from "./AIRecommendedRow";
import FavouritesRow from "./FavouritesRow";
import DealNotesRow from "./DealNoteRow";
import StartIQCoPilotCard from "./StartIQCoPilotCard";
import CoPilotColumn from "./CoPilotColumn";

const InvestorDashboardLayout = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState(null);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();
  const [favourites, setFavourites] = useState([]);
  const [dealNotes, setDealNotes] = useState([])

  const investorData = {
    investorName: "Rajiv Mehta",
    contactNumber: "+91 98765 43210",
    email: "rajiv.mehta@example.com",
    individualAngelInvestor: "Individual Angel Investor",
    investmentIdeology:
      "I focus on early-stage tech startups with strong founding teams and innovative products. I believe in hands-on mentoring alongside capital support",
    linkedin: "https://linkedin.com/in/rajivmehta",
    location: "Mumbai, India",
    preferredSectors: "Fintech, AI & ML, Mobility, HealthTech",
    ticketSizeRange: "₹25 Lakhs – ₹1 Crore",
  };

  const recommendedStartups = [
    { name: "FinTrack", sector: "Fintech", stage: "Seed", logoUrl: "https://logo.clearbit.com/figma.com" },
    { name: "EcoDrive", sector: "Mobility", stage: "Pre-Series A", logoUrl: "https://logo.clearbit.com/figma.com" },
    { name: "HealthMate", sector: "HealthTech", stage: "Seed", logoUrl: "https://logo.clearbit.com/figma.com" },
    { name: "EduGrow", sector: "EdTech", stage: "Seed", logoUrl: "https://logo.clearbit.com/figma.com" },
    { name: "Foodify", sector: "FoodTech", stage: "Pre-Series A", logoUrl: "https://logo.clearbit.com/figma.com" },
  ];






  // 🔹 User auth check
  useEffect(() => {
    const localId = sessionStorage.getItem("localId");
    if (!localId) {
      showToast("Invalid Route Access", "error");
      navigate("/");
    } else {
      setUid(localId);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!uid) return;
      try {
        showLoader();
        const { role } = await checkUserRole({ uid });
        setRole(role);

        if (role !== "investor") {
          showToast("Invalid Route Access", "error");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        hideLoader();
      }
    };
    fetchUserRole();
  }, [navigate, uid]);

  
  useEffect(() => {
  const getInvestorData = async () => {
    try {
      showLoader(); // show loader before fetching
      const data = await fetchFavouriteStartups(uid);
      const notes = await fetchDealNotes(uid)
      setFavourites(data);
      setDealNotes(notes)
    } catch (error) {
      console.error("Failed to fetch favourite startups:", error);
      showToast("Failed to load favourites", "error");
    } finally {
      hideLoader(); // hide loader in any case
    }
  };

  if (uid) {
    getInvestorData();
  }
}, [uid]);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 ml-[60px]">
        Investor Dashboard
      </h1>
      <BackButton />



      {/* === Row 1: Three Columns (40% / 30% / 30%) === */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Column 1 - 40% */}
        <div className="md:w-[40%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <InvestorOverviewCard investor={investorData} />
        </div>

        {/* Column 2 - 30% */}
        <div className="md:w-[30%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <NotificationCenter />
        </div>

        {/* Column 3 - 30% */}
        <div className="md:w-[30%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <CoPilotColumn/>
        </div>
      </div>

      {/* === Row 2: Full Width === */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow">
        <AIRecommendedRow startups={recommendedStartups} />
      </div>

      {/* === Row 3: Full Width === */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow">
        <FavouritesRow favourites={favourites} />
      </div>

      {/* === Row 3: Full Width === */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <DealNotesRow dealNotes={dealNotes} notesLeft={2} daysLeft={3} />
      </div>
    </div>
  );
};

export default InvestorDashboardLayout;
