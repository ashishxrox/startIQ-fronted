import React, { useEffect, useState } from "react";
import { auth } from "../AuthPage/Firebase/firebase";
import { useToast } from "../../context/ContextToast";
import { useLoader } from "../../context/LoaderContext";
import { checkUserRole } from "../../services/userService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SideMenu from "./SideMenu";
import Toast from "../Utils/Toast"; // ✅ import reusable Toast
import useAutoLogout from "../../hooks/useAutoLogout";


const Nav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToast();

  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [role, setRole] = useState(null)
  const [userName, setUsername] = useState("User")


  // track user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useAutoLogout(() => {
    showToast("Session expired after 8 hours", "info");
    navigate("/auth");
  });


  useEffect(() => {
    const fetchUserRole = async () => {
      const localId = sessionStorage.getItem("localId");
      if (!localId) return;
      try {
        showLoader();
        const { role, profile } = await checkUserRole({uid:localId});
        if (role == "founder"){
          setUsername(profile.founderName)
        }else{
          setUsername(profile.investorName)
        }
        
        setRole(role)
      } catch (error) {
        console.error("Error fetching user role:", error);
      }finally{
        hideLoader();
      }
    };

    fetchUserRole();
  }, [user]);

  // logout handler
  const handleLogout = async () => {
    try {
      showLoader();
      await signOut(auth);
      sessionStorage.removeItem("localId");
      setToast({ message: "👋 Logged out successfully!", type: "success" });
      setTimeout(() => navigate("/"), 1200); // redirect after toast shows
    } catch (error) {
      console.error("Logout error:", error);
      setToast({ message: "❌ Failed to logout. Try again.", type: "error" });
    }finally{
      hideLoader()
    }
  };

  return (
    <div
      className={`h-[75px] w-full flex justify-center items-center ${currentPath === "/role-selection"
        ? "fixed z-[9] bg-transparent"
        : currentPath.startsWith("/registration")
          ? "fixed z-[9] bg-[rgba(255,255,255,0)] backdrop-blur-[5px]"
          : "bg-gray-50"
        }`}
    >
      <div className="w-[90%] h-full flex justify-between items-center flex-row">
        <Link
          to={"/"}
          className="basis-[20%] h-[90%] w-full bg-[rgba(255,255,255,0)] flex justify-center items-center"
        >
          <h1 className="text-[42px] font-[900]">StartIQ</h1>
        </Link>

        <div
          className={`basis-[25%] h-[90%] w-full flex justify-start gap-[20px] items-center flex-row ${currentPath === "/auth" ? "relative" : ""
            }`}
        >

          {user ? (
            // If user logged in -> show logout
            <button
              onClick={handleLogout}
              className="btn btn-secondary flex justify-center items-center"
            >
              Logout
            </button>
          ) : (
            // If no user -> show login/signup
            <>
              <Link
                to={"/auth"}
                state={{ showLogin: true }}
                className={`btn btn-secondary flex justify-center items-center ${currentPath === "/auth" ? "absolute z-[9] left-0" : "text-black"
                  }`}
              >
                Log in
              </Link>

              <Link
                to={"/auth"}
                state={{ showLogin: false }}
                className={`btn btn-primary flex justify-center items-center ${currentPath === "/auth" ? "absolute z-[9] right-0" : "text-black"
                  }`}
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
      {user && <SideMenu userName={userName} role={role}/>}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={2500}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Nav;
