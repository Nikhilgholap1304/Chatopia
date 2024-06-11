import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useUserStore } from "../lib/userStore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUid, setCurrentUid] = useState(null);
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const checkSession = () => {
      const loginTimestamp = localStorage.getItem("loginTimestamp");
      const currentTime = new Date().getTime();
      const tenDaysInMillis = 10 * 24 * 60 * 60 * 1000;

      if (loginTimestamp && currentTime - loginTimestamp > tenDaysInMillis) {
        localStorage.removeItem("uid");
        localStorage.removeItem("loginTimestamp");
        signOut(auth);
        setCurrentUid(null);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUid(user.uid);
        localStorage.setItem("loginTimestamp", new Date().getTime());
        localStorage.setItem("uid", user.uid);
        fetchUserInfo(user.uid);
      }
    });

    //this is for storing user details on userStore (zustand state manager)

    checkSession();

    return () => unsubscribe();
  }, [fetchUserInfo, currentUid]);

  return (
    <AuthContext.Provider value={{ currentUid, setCurrentUid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
