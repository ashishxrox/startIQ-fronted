// src/authService.js
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// ----------------------
// Core Auth Functions
// ----------------------

// Sign up with email & password
export const signUp = async (email, password, displayName = "") => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }
  // ✅ Store UID (localId) in sessionStorage
  sessionStorage.setItem("localId", userCredential.user.uid);
  return userCredential;
};

// Login with email & password
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  // ✅ Store UID (localId) in sessionStorage
  sessionStorage.setItem("localId", userCredential.user.uid);
  return userCredential;
};

// Google Sign-in
// export const googleLogin = async () => {
//   const provider = new GoogleAuthProvider();
//   const userCredential = await signInWithPopup(auth, provider);
//   // ✅ Store UID (localId) in sessionStorage
//   sessionStorage.setItem("localId", userCredential.user.uid);
//   return userCredential;
// };

// Logout
export const logout = async () => {
  // ✅ Clear from sessionStorage on logout
  sessionStorage.removeItem("localId");
  return await signOut(auth);
};


// Track auth state
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback); // returns unsubscribe function
};
