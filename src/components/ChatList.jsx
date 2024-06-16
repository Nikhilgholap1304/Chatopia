import React, { useEffect, useState } from "react";
import Demo from "../assets//Demo/Demo.jpg";
import "./style/style.scss";
import { Button } from "@material-tailwind/react";
import Ripples from "react-ripples";
import { motion } from "framer-motion";
import { useUserStore } from "../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import Avatar from "react-avatar";
import { useChatStore } from "../lib/chatStore";

const ChatList = ({
  searchActive,
  setSideBarOpen,
  sideBarOpen,
  setSearchActive,
}) => {
  const { currentUid } = useAuth();
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();
  const [skeletonLoad, setSkeletonLoad] = useState(true);
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        // console.log("Current data: ", doc.data());
        const items = res.data().chats;
        if (!items) {
          return;
        }

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  useEffect(() => {
    if (chats.length === 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
    console.log(chats);
  }, [chats]);

  const handleSelect = async (chat) => {
    await changeChat(chat.chatId, chat.user);
    setSideBarOpen(false);
    console.log(chat.chatId, chat.user);
  };
  useEffect(() => {
    setTimeout(() => {
      setSkeletonLoad(false);
    }, 1500);
  }, []);

  return (
    <>
      <motion.section
        className={`flex flex-col w-full h-full overflow-x-hidden chatlist absolute `}
        animate={{
          x: searchActive ? "100%" : 0,
          opacity: searchActive ? 0 : 1,
        }}
        transition={{
          duration: 0.1,
        }}
      >
        {chats.length !== 0 &&
          chats.map((chat) => (
            <div
              className={`flex hover:bg-graylightsecondarytextcolor cursor-pointer relative transition-all ${
                chat.chatId === chatId && "bg-graylightsecondarytextcolor"
              }`}
              key={chat.chatId}
            >
              <Ripples
                className="absolute w-full h-full flex p-2 gap-2 items-center"
                during={1200}
                onClick={() => handleSelect(chat)}
              >
                <div className="rounded-full size-[3rem] min-w-[3rem] min-h-[3rem]">
                  {skeletonLoad ? (
                    <div className="w-full h-full bg-gray-800 rounded-full animate-pulse" />
                  ) : (
                    <Avatar
                      src={chat.user.avatar ? chat.user.avatar : ""}
                      round={true}
                      name={chat.user?.username?.charAt(0)}
                      className="w-full h-full m-auto border-brown-200 border border-t"
                      size="100%"
                      color="rgb(141 110 99)"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center w-full gap-1">
                  <div className="flex justify-between">
                    {skeletonLoad ? (
                      <div className="w-[10rem] h-4 bg-gray-800 animate-pulse rounded" />
                    ) : (
                      <h5 className="xs:leading-5 xs:text-base leading-4 text-sm">
                        {chat.user.username}
                      </h5>
                    )}
                    {skeletonLoad ? (
                      <div className="w-[2rem] h-3 bg-gray-800 animate-pulse rounded" />
                    ) : (
                      <p className="xs:text-xs text-[0.7rem] leading-3 text-graysecondarytextcolor">
                        15:35
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    {skeletonLoad ? (
                      <div className="w-[15rem] h-4 bg-gray-800 animate-pulse rounded" />
                    ) : (
                      <p
                        className="text-nowrap flex-[10rem]
                  w-[10rem] whitespace-nowrap
              text-ellipsis overflow-hidden xs:text-base text-sm text-graysecondarytextcolor"
                      >
                        {chat.lastMessage}
                      </p>
                    )}
                    {skeletonLoad ? (
                      <div className="w-4 h-4 bg-gray-800 animate-pulse rounded" />
                    ) : (
                      <span className="bg-brown-500 xs:size-6 2xs:size-5 grid place-content-center rounded-full leading-none text-xs">
                        2
                      </span>
                    )}
                  </div>
                </div>
              </Ripples>
            </div>
          ))}
      </motion.section>
    </>
  );
};

export default ChatList;
