import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StartupDetailsCard from "./StartupDetailsCard";
import StartupScoreCard from "./StartupScoreCard";
import GreenFlagsCard from "./GreenFlagsCard";
import RedFlagsCard from "./RedFlagsCard";
import PeerComparisonCard from "./PeerComparisonCard";
import WeeklyUpdateCard from "./WeeklyUpdateCard";
import WeeklyUpdateGallery from './WeeklyUpdateGallery'
import { checkUserRole } from "../../services/userService";
import BackButton from "../Utils/BackButton";

const sampleData = {
  name: "FinPay",
  logo: "https://via.placeholder.com/80",
  industry: "FinTech",
  location: "Pune, India",
  website: "https://finpay.com",
  founders: [
    {
      name: "Ashish Nair",
      email: "hidden",
      contact: "hidden",
      linkedin: "https://linkedin.com/in/example",
      bio: "Passionate about simplifying digital payments.",
    },
  ],
  overview: {
    pitch: "Making digital payments seamless for SMEs.",
    problem: "SMEs struggle with fragmented payment systems.",
    solution: "Unified API & dashboard for all transactions.",
    stage: "MVP",
    founded: "2024",
  },
};

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
    logo: "https://via.placeholder.com/80", // You can replace this with a real logo field if available
    industry: profile.industry || "",
    location: profile.location || "",
    website: profile.website || "",
    founders: [
      {
        name: profile.founderName || "",
        email: profile.email || "hidden",
        contact: profile.contactNumber || "hidden",
        linkedin: profile.linkedin || "",
        bio: profile.milestones || "", // or any other suitable description
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
  const [startupData, setStartupData] = useState(null)
  const [role, setRole] = useState(null)
  const { uid: urlUid } = useParams();

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
      const { role, profile } = await checkUserRole({ uid });
      setRole(role);

      // ✅ Switch UID source based on role
      if (role === "investor" && urlUid) {
        console.log("Investor mode → using UID from URL:", urlUid);
        console.log(typeof urlUid);

        const { profile: startupProfile } = await checkUserRole({
          uid: "",
          startupID: urlUid,
        });

        setStartupData(transformProfileToData(startupProfile));
      } else if (role === "founder") {
        console.log("Founder mode → using UID from session:", uid);
        setStartupData(transformProfileToData(profile));
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  fetchUserRole();
}, [uid, urlUid]);




  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {role == "investor" && <BackButton/>}
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left wide col */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            {/* <StartupDetailsCard data={sampleData} /> */}
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

        {/* Row 3 */}
        {role == 'founder' && <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <WeeklyUpdateCard />
        </div>}

        {/* Row 4 */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <WeeklyUpdateGallery updates={updates} />;
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;