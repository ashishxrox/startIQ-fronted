import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../AuthPage/Firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Toast from "../Utils/Toast"; // ✅ import reusable Toast
import SideMenu from "./SideMenu";
import { checkUserRole } from "../../services/userService";

const Nav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchUserRole = async () => {
      const localId = sessionStorage.getItem("localId");
      if (!localId) return;
      try {
        const { role, profile } = await checkUserRole({uid:localId});
        setUsername(profile.investorName)
        setRole(role)
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [user]);

  // logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("localId");
      setToast({ message: "👋 Logged out successfully!", type: "success" });
      setTimeout(() => navigate("/"), 1200); // redirect after toast shows
    } catch (error) {
      console.error("Logout error:", error);
      setToast({ message: "❌ Failed to logout. Try again.", type: "error" });
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
          className={`basis-[25%] h-[90%] w-full flex justify-between items-center flex-row ${currentPath === "/auth" ? "relative" : ""
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
      {user && role == "investor" && <SideMenu userName={userName}/>}

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
