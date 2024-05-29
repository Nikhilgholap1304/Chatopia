import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ErrorToast = ({ message }) => {
  toast.error(message);
  return null; // Returning null avoids unnecessary rendering
};

const checkInternetConnection = () => {
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [prevConnected, setPrevConnected] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineEvent = () => setIsConnected(true);
    const handleOfflineEvent = () => setIsConnected(false);

    window.addEventListener("online", handleOnlineEvent);
    window.addEventListener("offline", handleOfflineEvent);

    return () => {
      window.removeEventListener("online", handleOnlineEvent);
      window.removeEventListener("offline", handleOfflineEvent);
    };
  }, []);

  if (!isConnected) {
    return <ErrorToast message="No internet connection" />;
  }


  return null; 
};

export default checkInternetConnection;
