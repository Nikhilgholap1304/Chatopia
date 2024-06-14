import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import { useMediaQuery } from "react-responsive";
import LightBox from "../components/LightBox";
import { useChatStore } from "../lib/chatStore";

const Dashboard = () => {
  const Navigate = useNavigate();
  const { currentUid } = useAuth();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const Max1080 = useMediaQuery({
    query: "(max-width: 1080px)",
  });
  const {chatId, changeChat} = useChatStore();

  useEffect(() => {
    if (!Max1080) {
      setSideBarOpen(true);
    }
  }, [sideBarOpen, setSideBarOpen]);

  const [assetPreviewTog, setAssetPreviewTog] = useState(false);
  const [assetSources, setAssetSources] = useState([]);

  const handleAssetSource = (src) => {
    setAssetSources([src]);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      changeChat(null, null);
      localStorage.removeItem("uid");
      localStorage.removeItem("loginTimestamp");
      localStorage.removeItem('chatId');
      localStorage.removeItem('user');
      Navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <SideBar
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
        logout={handleLogout}
      />
      {/* {chatId ? ( */}
        <Chat
          setSideBarOpen={setSideBarOpen}
          sideBarOpen={sideBarOpen}
          setAssetPreviewTog={setAssetPreviewTog}
          handleAssetSource={handleAssetSource}
        />
      {/* ):''} */}
      {/* <div>
        <h1>{currentUid}</h1>
        <button onClick={handleLogout}>logout</button>
      </div> */}
      <LightBox
        assetPreviewTog={assetPreviewTog}
        assetSources={assetSources}
        setAssetSources={setAssetSources}
      />
    </div>
  );
};

export default Dashboard;
