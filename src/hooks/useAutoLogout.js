import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Components/AuthPage/Firebase/firebase"; // adjust path if needed

const useAutoLogout = (logoutCallback) => {
  useEffect(() => {
    // Set 8-hour timer (8 * 60 * 60 * 1000 ms)
    const timer = setTimeout(async () => {
      await signOut(auth);
      sessionStorage.removeItem("localId");
      logoutCallback?.(); // optional callback for UI or navigation
      console.log("⏰ Auto-logged out after 8 hours");
    }, 8 * 60 * 60 * 1000);

    // Cleanup: clear timer when component unmounts
    return () => clearTimeout(timer);
  }, [logoutCallback]);
};

export default useAutoLogout;
