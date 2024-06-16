import React, { useEffect, useState } from "react";
import Demo from "../assets/Demo/Demo.jpg";
import "./style/style.scss";
import { Button } from "@material-tailwind/react";
import Ripples from "react-ripples";
import { motion } from "framer-motion";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import Avatar from "react-avatar";
import { useUserStore } from "../lib/userStore";

const SearchList = ({ searchActive, input, setInput, setSearchActive }) => {
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchSkeleLoading, setSearchSkeleLoading] = useState(false);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const handleUserSearch = async () => {
      if (input === "") {
        setSearchUsers([]);
        return;
      }
      try {
        setSearchSkeleLoading(true);
        const usersRef = collection(db, "users");
        // const lowerCaseInput = input.toLowerCase();

        const q = query(
          usersRef,
          where("username", ">=", input),
          where("username", "<=", input + "\uf8ff")
        );

        const querySnapShot = await getDocs(q);

        const usersList = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSearchUsers(usersList);
        setTimeout(() => {
          setSearchSkeleLoading(false);
        }, 300);
        // console.log(usersList);
      } catch (err) {
        console.log(err);
      }
    };

    handleUserSearch();
  }, [input]);

  const handleAdd = async (userId) => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    try {
      // check if chat already exists
      const userChatsDoc = await getDoc(doc(userChatsRef, currentUser.id));
      const userChatsData = userChatsDoc.data();
      const chatExists = userChatsData.chats.some(
        (chat) => chat.receiverId === userId
      );

      if (chatExists) {
        console.log("chat already exists");
        setInput("");
        setSearchActive(false);
        return;
      }

      // Create a new chat
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, userId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: userId,
          updatedAt: Date.now(),
        }),
      });

      setInput("");
      setSearchActive(false);
      console.log(newChatRef.id);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.section
      className={`flex flex-col w-full h-full overflow-x-hidden chatlist pb-[3.7rem]`}
      animate={{
        x: searchActive ? "0" : "-100%",
        opacity: searchActive ? 1 : 0,
      }}
      transition={{
        duration: 0.1,
      }}
    >
      {searchUsers.map((user, index) => (
        <motion.div
          className={`flex hover:bg-graylightsecondarytextcolor cursor-pointer relative `}
          initial={{
            y: (index + 2) * 5,
          }}
          animate={{
            y: 0,
          }}
          key={user.id}
        >
          <Ripples
            className="absolute w-full h-full flex p-2 gap-2 items-center"
            during={1200}
            onClick={() => handleAdd(user.id)}
          >
            <div className="rounded-full size-[3rem] min-w-[3rem] min-h-[3rem]">
              {searchSkeleLoading ? (
                <div className="w-full h-full bg-gray-800 rounded-full animate-pulse" />
              ) : (
                <Avatar
                  src={user.avatar ? user.avatar : ""}
                  round={true}
                  name={user?.username?.charAt(0)}
                  className="w-full h-full m-auto border-brown-200 border border-t"
                  size="100%"
                  color="rgb(141 110 99)"
                />
              )}
            </div>
            <div className="flex flex-col justify-center w-full gap-1">
              <div className="flex justify-between">
                {/* <p className="text-xs leading-3">15:35</p> */}
                {searchSkeleLoading ? (
                  <div className="w-[10rem] h-4 bg-gray-800 animate-pulse rounded" />
                ) : (
                  <h5 className="xs:leading-5 xs:text-base leading-4 text-sm">
                    {user.username}
                  </h5>
                )}
              </div>
              <div className="flex justify-between items-center">
                {searchSkeleLoading ? (
                  <div className="w-[15rem] h-4 bg-gray-800 animate-pulse rounded" />
                ) : (
                  <p
                    className="text-nowrap flex-[10rem]
                    w-[10rem] whitespace-nowrap
              text-ellipsis overflow-hidden xs:text-base text-sm text-graysecondarytextcolor"
                  >
                    @{user.username}
                  </p>
                )}
                {/* <span className="bg-brown-500 size-6 grid place-content-center rounded-full leading-4 text-sm">
                  5
                </span> */}
              </div>
            </div>
          </Ripples>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default SearchList;
