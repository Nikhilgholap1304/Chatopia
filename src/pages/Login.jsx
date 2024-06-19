import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import {
  auth,
  googleProvider,
  githubProvider,
  db,
  storage,
} from "../lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import designBg from "../assets/bgImages/designBg1.png";
import { useUserStore } from "../lib/userStore";

const Login = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const { currentUid, setCurrentUid } = useAuth();
  const { logout } = useUserStore();

  const handleClick = (id) => {
    setLoading(id);
    const provider = id === 1 ? googleProvider : githubProvider;
    const handleLogin = async () => {
      try {
        const data = await signInWithPopup(auth, provider);
        const user = data.user;

        const userRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(userRef);

        let profilePicUrl = "";

        if (user.photoURL && !docSnapshot.exists()) {
          try {
            const res = await fetch(user.photoURL);
            if (!res.ok) {
              throw new Error(
                `Failed to fetch profile picture: ${res.statusText}`
              );
            }
            const blob = await res.blob();
            const storageRef = ref(storage, `profile_pictures/${user.uid}`);
            await uploadBytes(storageRef, blob);
            profilePicUrl = await getDownloadURL(storageRef);
          } catch (error) {
            console.error("Error uploading profile picture:", error);
          }
        }

        if (!docSnapshot.exists()) {
          const username = user.displayName || "Anonymous";
          const email = user.email || "NoEmail";

          await setDoc(userRef, {
            username: username,
            email: email,
            avatar: profilePicUrl,
            id: user.uid,
            lastSeen: serverTimestamp(),
            blocked: [],
          });

          await setDoc(doc(db, "userchats", user.uid), {
            chats: [],
          });
        }

        localStorage.setItem("loginTimestamp", new Date().getTime());
        localStorage.setItem("uid", user.uid);
        setLoading(null);
        localStorage.setItem('Loading',true);
        Navigate(`/${user.uid}`);
        window.location.reload();
      } catch (err) {
        console.error(
          `Error logging in with ${id === 1 ? "Google" : "GitHub"}:`,
          err
        );
        setLoading(null);
        toast.error("Try again");
      }
    };
    handleLogin();
  };

  useEffect(() => {
    setCurrentUid(localStorage.getItem("uid"));
    logout();
    if (currentUid) {
      Navigate(`/${currentUid}`);
    }
  }, [setCurrentUid, Navigate, currentUid]);

  return (
    <>
      <div
        className="w-full h-screen flex items-center justify-center relative text-lightest"
        style={{
          backgroundImage:
            " linear-gradient(to right bottom, #40322c, #4a362c, #543b2c, #5e402c, #67452b, #6d492b, #744e2b, #7a522b, #80572d, #865c2f, #8c6130, #926632)",
        }}
      >
        <div
          className="absolute top-0 left-0 bottom-0 w-full "
          style={{ backgroundImage: `url('${designBg}')` }}
        ></div>
        <div className="w-fit h-fit flex items-center justify-center flex-col gap-5 bg-brown-800 border border-brown-700 p-7 rounded-md shadow-lg scale-[0.95] xs:scale-100">
          <h1 className="font-roboto text-2xl mb-5">
            Welcome to{" "}
            <span className="font-adventPro text-3xl font-bold">Chatopia</span>
          </h1>
          <Button
            size="lg"
            variant="outlined"
            className={`flex items-center gap-3 bg-gray-900 text-brown-200 rounded-md w-full justify-center ${
              loading === 1 ? "" : "p-1 pr-4"
            }`}
            loading={loading === 1 && true}
            onClick={() => handleClick(1)}
            disabled={(loading === 2 && true) || (loading === 1 && true)}
          >
            {loading == 1 ? (
              ""
            ) : (
              <>
                <div className="w-10 h-10 bg-primary grid place-items-center rounded">
                  <img
                    src="https://docs.material-tailwind.com/icons/google.svg"
                    alt="metamask"
                    className="h-6 w-6"
                  />
                </div>
                Continue with Google
              </>
            )}
          </Button>
          <div className="flex gap-2 items-center w-full justify-between">
            <span className="w-full h-[0.1px] rounded bg-accent"></span>
            <p>or</p>
            <span className="w-full h-[0.1px] rounded bg-accent"></span>
          </div>
          <Button
            size="lg"
            variant="outlined"
            className={`flex items-center gap-3 bg-gray-900 text-brown-200 rounded-md w-full justify-center ${
              loading === 2 ? "" : "p-1 pr-4"
            }`}
            loading={loading === 2 && true}
            onClick={() => handleClick(2)}
            disabled={(loading === 2 && true) || (loading === 1 && true)}
          >
            {loading == 2 ? (
              ""
            ) : (
              <>
                <div className="w-10 h-10 grid place-items-center rounded-sm">
                  <FaGithub className="h-6 w-6" />
                </div>
                Continue with Github
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
