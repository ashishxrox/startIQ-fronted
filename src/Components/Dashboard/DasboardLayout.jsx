const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StartupDetailsCard from "./StartupDetailsCard";
import StartupScoreCard from "./StartupScoreCard";
import GreenFlagsCard from "./GreenFlagsCard";
import RedFlagsCard from "./RedFlagsCard";
import PeerComparisonCard from "./PeerComparisonCard";
import WeeklyUpdateCard from "./WeeklyUpdateCard";
import WeeklyUpdateGallery from "./WeeklyUpdateGallery";
import DealNoteModal from "./DealNoteModal";
import Banner from "./Baner";
import AILoader from "../Utils/AILoader";
import { checkUserRole } from "../../services/userService";
import { checkDocuments } from "../../services/documentService"; // ✅ import
import { analyseStartupWithAI } from "../../services/aiService"; // ✅ new import
import { generateDealNote } from "../../services/investorAiService";
import { addFavouriteStartup } from "../../services/investorService";
import BackButton from "../Utils/BackButton";
import { useLoader } from "../../context/LoaderContext";
import { useToast } from "../../context/ContextToast";
import LikeButton from "../Utils/LikeButton";

const updates2 = [
  {
    text: "We onboarded 5 new clients this week and improved our payment API speed by 30% 🚀",
    image: "https://via.placeholder.com/300x200",
    date: "Sep 5, 2025",
  },
  // {
  //   text: "Launched new investor dashboard with live transaction monitoring.",
  //   image: null,
  //   date: "Aug 29, 2025",
  // },
  // {
  //   text: "Secured seed funding of $1M from XYZ Ventures 🎉",
  //   image: "https://via.placeholder.com/300x200",
  //   date: "Aug 22, 2025",
  // },
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
  const [ytLink, setYtLink] = useState(null)
  const [role, setRole] = useState(null);
  const [updates, setUpdate] = useState(null)
  const [newUpdate, setNewUpdate] = useState(false)
  const [startupID, setStartupID] = useState(null)
  const [dealNoteOpen, setDealNoteOpen] = useState(false);
  const { uid: urlUid } = useParams();
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();
  const [fav, setFavourite] = useState(null)
  const [liked, setLiked] = useState(null)

  useEffect(() => {
    if (fav != null && startupID != null) {
      console.log(fav)
      console.log(fav.includes(startupID))
      setLiked(fav.includes(startupID))
    }
  }, [fav, startupID])

  useEffect(() => {
    if (role == "investor") {
      if (liked == true) {
        showToast("Startup added to favourite", "success");
      }
    }

  }, [liked])


  // ✅ AI states
  const [aiScore, setAiScore] = useState(null);
  const [redFlags, setRedFlags] = useState([]);
  const [greenFlags, setGreenFlags] = useState([]);
  const [createdAt, setCreatedAt] = useState(null)
  const [aiLoading, setAiLoading] = useState(false);
  const [dealNote, setDealNote] = useState(null)


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
        const { role, profile, ytLink } = await checkUserRole({ uid });
        setRole(role);

        if (role === "investor") {
          const { favourites } = await checkUserRole({ uid })
          setFavourite(favourites)
        }

        if (role === "investor" && urlUid) {
          // Investor can view startup details
          const { profile: startupProfile, ytLink: ytLink } = await checkUserRole({
            uid: "",
            startupID: urlUid,
          });
          setStartupID(urlUid)
          setYtLink(ytLink)
          setStartupData(transformProfileToData(startupProfile));
        } else if (role === "founder") {
          // Founder should see their own startup
          setStartupData(transformProfileToData(profile));
          setYtLink(ytLink)
          // ✅ Extra check → ensure documents exist
          const startupID = profile?.startupID;
          setStartupID(startupID)
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
      } finally {
        hideLoader();
      }
    };

    fetchUserRole();
  }, [uid, urlUid, navigate]);



  useEffect(() => {
    const fetchAIAnalysis = async () => {
      if (!startupID) return;

      try {
        // showLoader();
        setAiLoading(true)
        const { insights, redFlags, greenFlags, score, createdAt } =
          await analyseStartupWithAI(startupID);

        // ✅ update your states
        setAiScore(score);
        setRedFlags(redFlags || []);
        setGreenFlags(greenFlags || []);
        setCreatedAt(createdAt || 0)
      } catch (error) {
        console.error("❌ Error fetching AI analysis:", error);
      } finally {
        // hideLoader();
        setAiLoading(false)
      }
    };

    fetchAIAnalysis();
  }, [startupID]);


  useEffect(() => {
    if (createdAt) {
      const date = new Date(createdAt);

      // Format: 14 Feb 2025 hh:MM
      const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // set to true if you want AM/PM
      });
      showToast(`Last updated on: ${formattedDate}`, "info", 6000);
    }
  }, [createdAt]);


  useEffect(() => {
    if (startupID) {
      const fetchStartupUpdates = async () => {
        try {
          showLoader()
          if (!startupID) throw new Error("startupID is required to fetch startup updates");

          const response = await fetch(
            `${API_BASE_URL}/users/startup-updates/${startupID}`
          );

          if (!response.ok) {
            if (response.status === 404) {
              showToast("Problem fetching update", "error");
              return [];
            }
            throw new Error(`Failed to fetch updates: ${response.statusText}`);
          }

          const data = await response.json(); // { updates: [...] }
          return data.updates || []; // ✅ extract the array
        } catch (error) {
          console.error(error);
          return [];
        } finally {
          hideLoader()
        }
      };

      fetchStartupUpdates().then((updatesArray) => setUpdate(updatesArray));
    }
  }, [startupID, newUpdate]);

  const dealNoteConstructor = (note, startupData) => {
    return {
      ...note,
      name: startupData?.name,
      logo: startupData?.logo,
      stage: startupData?.overview?.stage,
      sector: startupData?.industry,
      location: startupData?.location
    }
  }

  const handleViewDealNote = async () => {
    try {
      setDealNoteOpen(true) // ✅ Open modal here instead of useEffect
      setAiLoading(true)
      const note = await generateDealNote(uid, startupID)
      setDealNote(dealNoteConstructor(note, startupData)) // ✅ Construct before storing

    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setAiLoading(false)
    }
  }


  const handleAddToFavorite = async () => {
    console.log("function called")
    try {
      showLoader()
      const response = await addFavouriteStartup(uid, startupID);
      console.log(response.message);
      setLiked(!liked)
    } catch (err) {
      console.error("Failed to add favourite", err);
    } finally {
      hideLoader()
    }
  }


  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* 🔹 Banner Section */}
      {role === "investor" && <BackButton />}
      {role === "investor" && (
        <div className="flex items-center gap-4 mb-4 relative left-[5%]">
          {/* <BackButton /> */}
          <button
            onClick={() => {

              handleViewDealNote()

            }}
            className="btn btn-primary transition cursor-pointer"
          >
            View Deal Note
          </button>
        </div>
      )}
      {role === "investor" && <LikeButton defaultLiked={liked} onToggle={handleAddToFavorite} />}
      <Banner
        videoUrl={ytLink ? ytLink : "https://www.youtube.com/embed/dQw4w9WgXcQ"} // pass YT link here
        startupName={startupData?.name || "My Startup"}
      />
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
              {aiLoading ? (<AILoader done={false}
                messages={["Calculating overall startup potential score...", "Balancing risks and opportunities into a single score...", "Generating your startup’s performance index..."]}
              />) : (<StartupScoreCard score={aiScore ?? 78} />)}
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              {aiLoading ? (<AILoader done={false}
                messages={["Identifying strong advantages and growth signals...", "Spotting positive factors that boost investor confidence...", "Highlighting strengths and competitive edges..."]}
              />) : (<GreenFlagsCard
                flags={greenFlags ?? [
                  "Strong team",
                  "Early traction",
                  "Innovative product",
                  "Scalable model",
                  "Clear market fit",
                ]}
              />)}
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              {aiLoading ? (<AILoader done={false}
                messages={["Checking for potential risks and warning signs...", "Evaluating challenges that could slow down growth...", "Highlighting weaknesses investors should consider..."]}
              />) : (<RedFlagsCard
                flags={redFlags ?? [
                  "High burn rate",
                  "Unproven market",
                  "Weak team experience",
                  "No clear revenue model",
                ]}
              />)}
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
            <WeeklyUpdateCard uid={uid} setNewUpdate={setNewUpdate} />
          </div>
        )}

        {/* Row 4 → Gallery */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <WeeklyUpdateGallery updates={updates} setNewUpdate={setNewUpdate} newUpdate={newUpdate} />
        </div>
      </div>
      <DealNoteModal
        isOpen={dealNoteOpen}
        onClose={() => setDealNoteOpen(false)}
        startup={dealNote}
        aiLoading={aiLoading}
      />

    </div>
  );
};

export default DashboardLayout;
