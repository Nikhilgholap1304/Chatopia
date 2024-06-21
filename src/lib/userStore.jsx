import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContext";

// const CurrentUid = () => {
//   const {CurrentUid} = useAuth();
//   return CurrentUid;
// }

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async () => {
    const currentUid = localStorage.getItem("uid");
    if (!currentUid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(db, "users", currentUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        set({ currentUser: docSnap.data(), isLoading: false });
        localStorage.setItem("Loading",false);
      } else {
        set({ currentUser: null, isLoading: false });
        localStorage.setItem("Loading",false);
      }
    } catch (error) {
      console.log(error);
      localStorage.setItem("Loading",false);
      return set({ currentUser: null, isLoading: false });
    }
  },
  logout: async () => {
    localStorage.setItem("Loading",false);
    return set({ isLoading: false });
  },
}));
