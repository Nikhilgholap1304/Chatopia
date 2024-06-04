import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import { useMediaQuery } from "react-responsive";

const Dashboard = () => {
  const Navigate = useNavigate();
  const { currentUid } = useAuth();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const Max960 = useMediaQuery({
    query: "(max-width: 960px)",
  });

  useEffect(() => {
    if (!Max960) {
      setSideBarOpen(true);
    }
  },[sideBarOpen, setSideBarOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
      localStorage.removeItem("loginTimestamp");
      Navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <Chat setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
      {/* <div>
        <h1>{currentUid}</h1>
        <button onClick={handleLogout}>logout</button>
      </div> */}
    </div>
  );
};

export default Dashboard;
