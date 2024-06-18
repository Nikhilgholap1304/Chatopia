import { useEffect } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase"; 
import { useUserStore } from "../lib/userStore";

const useTrackUserActivity = () => {
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser) return;

    const updateLastSeen = async () => {
      const userRef = doc(db, "users", currentUser.id);
      await setDoc(userRef, { lastSeen: serverTimestamp() }, { merge: true });
    };

    const handleActivity = () => {
      updateLastSeen();
    };

    // Update last seen on component mount and when user interacts with the page
    updateLastSeen();
    window.addEventListener("click", handleActivity);
    window.addEventListener("keypress", handleActivity);

    return () => {
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keypress", handleActivity);
    };
  }, [currentUser]);
};

export default useTrackUserActivity;
