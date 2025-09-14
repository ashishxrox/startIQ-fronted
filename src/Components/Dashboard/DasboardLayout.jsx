import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StartupDetailsCard from "./StartupDetailsCard";
import StartupScoreCard from "./StartupScoreCard";
import GreenFlagsCard from "./GreenFlagsCard";
import RedFlagsCard from "./RedFlagsCard";
import PeerComparisonCard from "./PeerComparisonCard";
import WeeklyUpdateCard from "./WeeklyUpdateCard";
import WeeklyUpdateGallery from "./WeeklyUpdateGallery";
import { checkUserRole } from "../../services/userService";
import { checkDocuments } from "../../services/documentService"; // ✅ import
import BackButton from "../Utils/BackButton";
import { useLoader } from "../../context/LoaderContext";

const updates = [
  {
    text: "We onboarded 5 new clients this week and improved our payment API speed by 30% 🚀",
    image: "https://via.placeholder.com/300x200",
    date: "Sep 5, 2025",
  },
  {
    text: "Launched new investor dashboard with live transaction monitoring.",
    image: null,
    date: "Aug 29, 2025",
  },
  {
    text: "Secured seed funding of $1M from XYZ Ventures 🎉",
    image: "https://via.placeholder.com/300x200",
    date: "Aug 22, 2025",
  },
];

const transformProfileToData = (profile) => {
  return {
    name: profile.startupName || "",
    logo: "https://via.placeholder.com/80",
    industry: profile.industry || "",
    location: profile.location || "",
    website: profile.website || "",
    founders: [
      {
        name: profile.founderName || "",
        email: profile.email || "hidden",
        contact: profile.contactNumber || "hidden",
        linkedin: profile.linkedin || "",
        bio: profile.milestones || "",
      },
    ],
    overview: {
      pitch: profile.pitch || "",
      problem: profile.problem || "",
      solution: profile.solution || "",
      stage: profile.stage || "",
      founded: profile.yearFounded || "",
    },
  };
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState(null);
  const [startupData, setStartupData] = useState(null);
  const [role, setRole] = useState(null);
  const { uid: urlUid } = useParams();
  const { showLoader, hideLoader } = useLoader();


  useEffect(() => {
    const localId = sessionStorage.getItem("localId");
    if (!localId) {
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
        const { role, profile } = await checkUserRole({ uid });
        setRole(role);

        if (role === "investor" && urlUid) {
          // Investor can view startup details
          const { profile: startupProfile } = await checkUserRole({
            uid: "",
            startupID: urlUid,
          });
          setStartupData(transformProfileToData(startupProfile));
        } else if (role === "founder") {
          // Founder should see their own startup
          setStartupData(transformProfileToData(profile));

          // ✅ Extra check → ensure documents exist
          const startupID = profile?.startupID;
          if (startupID) {
            const res = await checkDocuments(startupID);
            if (!res.exists) {
              console.warn("⚠️ No documents found → redirecting to docs page");
              navigate("/registration/startup/docs");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }finally{
        hideLoader();
      }
    };

    fetchUserRole();
  }, [uid, urlUid, navigate]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {role === "investor" && <BackButton />}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left wide col */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <StartupDetailsCard data={startupData} role={role} />
          </div>

          {/* Right col split into 3 */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <StartupScoreCard score={78} />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <GreenFlagsCard
                flags={[
                  "Strong team",
                  "Early traction",
                  "Innovative product",
                  "Scalable model",
                  "Clear market fit",
                ]}
              />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <RedFlagsCard
                flags={[
                  "High burn rate",
                  "Unproven market",
                  "Weak team experience",
                  "No clear revenue model",
                ]}
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <PeerComparisonCard
            data={[
              { name: "FinPay", industry: "FinTech", score: 78, highlight: true },
              { name: "PayEase", industry: "FinTech", score: 65, trending: true },
              { name: "Transactly", industry: "FinTech", score: 40 },
              { name: "NeoPayments", industry: "FinTech", score: 90, highlight: true },
            ]}
          />
        </div>

        {/* Row 3 → Only founders can add weekly updates */}
        {role === "founder" && (
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <WeeklyUpdateCard />
          </div>
        )}

        {/* Row 4 → Gallery */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <WeeklyUpdateGallery updates={updates} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
