import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  const Navigate = useNavigate();
  const { currentUid } = useAuth();

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
    <div className="flex w-screen h-screen ">
      <SideBar />
      {/* <div>
        <h1>{currentUid}</h1>
        <button onClick={handleLogout}>logout</button>
      </div> */}
    </div>
  );
};

export default Dashboard;
