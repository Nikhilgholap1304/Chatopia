import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import {
  IoCallOutline,
  IoDocumentOutline,
  IoEllipsisVertical,
  IoSearch,
  IoSend,
} from "react-icons/io5";
import Demo from "../assets/Demo/Demo.jpg";
import { FaArrowLeft } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { BsCameraVideo, BsEmojiSmile } from "react-icons/bs";
import { FiDownload, FiLock } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import "../components/style/style.scss";
import { HiPhoto } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import FsLightbox from "fslightbox-react";
import PaperPlane from "../assets/bgImages/PaperPlane.png";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useChatStore } from "../lib/chatStore";
import { useUserStore } from "../lib/userStore";

const Chat = ({
  setSideBarOpen,
  sideBarOpen,
  setAssetPreviewTog,
  handleAssetSource,
}) => {
  const [chat, setChat] = useState();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const [isPickerActivate, setIsPickerActivate] = useState(false);
  const [isUploadOpt, setIsUploadOpt] = useState(false);
  const endChatRef = useRef(null);
  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();
  const [skeletonLoad, setSkeletonLoad] = useState(true);

  useEffect(() => {
    endChatRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    setTimeout(() => {
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChat(res.data());
        console.log(res.data());
      });
      return () => {
        unSub();
      };
    }, 100);
  }, [chatId]);

  // console.log(user)
  console.log(localStorage.getItem("user"));
  console.log(chat?.messages[0].text);

  const Max1080 = useMediaQuery({
    query: "(max-width: 1080px)",
  });
  const Max450 = useMediaQuery({
    query: "(max-width: 450px)",
  });
  const handleMsgChange = (e) => {
    setText(e.target.value);
  };
  const handleActivatePicker = () => {
    setIsPickerActivate(!isPickerActivate);
  };
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };
  const handleSend = async () => {
    if (text === "") {
      return;
    }
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      // console.log(userIDs)

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
          setText("");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSkeletonLoad(false);
    }, 1500);
  }, []);

  return (
    <div
      className={`w-full h-full flex-2 lg:!translate-x-0 lg:!flex-1 lg:!w-full flex-1 flex flex-col relative justify-center 2xs:transition-none xs:transition-all ${
        !sideBarOpen
          ? "!translate-x-0 flex-[1]"
          : "translate-x-[100vw] flex-[0]"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #322200, #372701, #3d2b01, #423001, #473501, #4c3901, #523e01, #574201, #5e4701, #654b01, #6c5000, #735500",
      }}
    >
      <div className="bg-[url('./assets\bgImages\designBg1.png')] absolute inset-0" />
      {!chatId ? (
        <div
          className={`m-auto relative z-10 ${
            sideBarOpen ? "hidden" : "flex"
          } lg:!flex flex-col items-center lg:w-[30rem] 2xs:hidden bg-brown-900/40 px-1 pb-10 rounded-xl justify-center shadow-lg`}
        >
          <motion.div
            className="lg:w-[20rem] transition-all"
            animate={{
              y: [0, 10, 0],
              rotateX: ["0deg", "20deg", "0deg", "10deg", "0deg"],
              rotate: ["0deg", "20deg", "0deg", "10deg", "0deg"],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            <img src={PaperPlane} alt="" className="w-auto h-auto" />
          </motion.div>
          <span className="text-2xl font-bold opacity-50 text-center max-w-[24rem]">
            <span className="text-3xl text-brown-200">Whoa!</span>, you haven't
            selected the chat yet ?{" "}
          </span>
        </div>
      ) : (
        <>
          <div
            className={`relative bg-graysurface 2xs:px-2 sm:px-4 md:px-5 py-2 shadow ${
              !sideBarOpen
                ? "w-full visible !flex"
                : "2xs:w-0 2xs:hidden 2xs:invisible"
            } 
      lg:!w-full lg:!flex lg:!visible justify-between items-center gap-3 cursor-pointer`}
          >
            <div className="flex gap-2 items-center justify-center">
              <IconButton
                className={`hover:bg-graylightsecondarytextcolor xs:!p-5 2xs:p-2 ${
                  Max1080 ? "flex" : "hidden"
                }`}
                onClick={() => setSideBarOpen(!sideBarOpen)}
              >
                <FaArrowLeft
                  className={`text-graysecondarytextcolor transition-all ease-in-out duration-200 xs:!size-5 2xs:size-4`}
                />
              </IconButton>
              <div className="size-[3rem] xs:!size-[3rem] 2xs:size-[2.3rem] rounded-full">
                {skeletonLoad ? (
                  <div className="w-full h-full bg-gray-800 rounded-full animate-pulse" />
                ) : (
                  <Avatar
                    src={user?.avatar}
                    name={user?.username?.charAt(0)}
                    round={true}
                    size="100%"
                    className="w-full h-full m-auto border-brown-200 border border-t"
                    color="rgb(141 110 99)"
                  />
                )}
              </div>
              <div className="flex gap-1 justify-center flex-col">
                {skeletonLoad ? (
                  <div className="w-[8rem] h-4 bg-gray-800 animate-pulse rounded" />
                ) : (
                  <h3 className="xs:!leading-5 2xs:leading-none xs:!text-base 2xs:text-sm">
                    {user?.username}
                  </h3>
                )}
                {skeletonLoad ? (
                  <div className="w-[10rem] h-4 bg-gray-800 animate-pulse rounded" />
                ) : (
                  <p className="text-nowrap whitespace-nowrap overflow-hidden leading-none text-sm text-graysecondarytextcolor 2xs:text-xs xs:!text-sm">
                    last seen May 8 at 10:17
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <IconButton
                  className={`hover:bg-graylightsecondarytextcolor p-5 sm:!flex 2xs:hidden`}
                >
                  <IoCallOutline className="size-6 text-graysecondarytextcolor" />
                </IconButton>
                <IconButton
                  className={`hover:bg-graylightsecondarytextcolor p-5 sm:!flex 2xs:hidden`}
                >
                  <IoSearch className="size-6 text-graysecondarytextcolor" />
                </IconButton>
                <div className="relative">
                  <IconButton
                    className={`hover:bg-graylightsecondarytextcolor p-5 2xs:p-3 sm:!p-5 `}
                    onClick={() => setSideMenuOpen(!sideMenuOpen)}
                  >
                    <IoEllipsisVertical className="size-6 2xs:size-5 xs:!size-6 text-graysecondarytextcolor" />
                  </IconButton>
                  <div
                    className={`absolute w-[100vw] h-[100vh] bg-transparent -right-10 -top-3 z-50 transition-all ${
                      sideMenuOpen ? "visible" : "invisible"
                    }`}
                    onClick={() => setSideMenuOpen(false)}
                    onMouseLeave={() => setSideMenuOpen(false)}
                  >
                    <motion.div
                      className={`bg-graymain w-fit h-fit p-3 flex flex-col gap-2 rounded shadow-lg absolute cursor-pointer origin-top-right top-[3.8rem] right-10 `}
                      onClick={(e) => {
                        setSideMenuOpen(false);
                        e.stopPropagation();
                      }}
                      animate={{
                        opacity: sideMenuOpen ? 1 : 0,
                        scale: sideMenuOpen ? 1 : 0.3,
                      }}
                    >
                      <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                        <IoSearch className="size-[1.3rem]" />
                        <span className="font-medium text-sm">Search</span>
                      </div>
                      <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                        <IoCallOutline className="size-[1.3rem]" />
                        <span className="font-medium text-sm">Call</span>
                      </div>
                      <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                        <BsCameraVideo className="size-[1.2rem]" />
                        <span className="font-medium text-sm">Video Call</span>
                      </div>
                      <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                        <FiLock className="size-[1.2rem]" />
                        <span className="font-medium text-sm">Block User</span>
                      </div>
                      <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95] text-red-300">
                        <AiOutlineDelete className="size-[1.4rem]" />
                        <span className="font-medium text-sm">Delete Chat</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex-1 relative z-[1] w-full h-full flex flex-col items-center overflow-hidden ${
              !sideBarOpen ? "visible w-full flex" : "invisible w-0 hidden"
            } lg:visible lg:w-full lg:flex`}
          >
            <div className="flex flex-col overflow-y-scroll items-center chatcontainer w-full gap-3 justify-start">
              <section className="w-full flex flex-col lg:!max-w-[80%] md:!max-w-[80%] max-w-[90%] relative gap-2 first:mt-1">
                <div className="sticky top-1 w-full flex justify-center z-10">
                  <div className="bg-orange-900/50 py-[6px] px-3 rounded-full text-sm">
                    April 26
                  </div>
                </div>
                {chat?.messages.map((message) => {
                  return (
                    <div className="flex justify-end" key={message?.createdAt}>
                      <div className="max-w-[30rem] min-w-[4rem] bg-brown-500 break-words whitespace-pre-wrap py-1 pb-[1.2rem] px-3 rounded-xl rounded-r-sm rounded-br-none relative">
                        <h1>{message?.text}</h1>
                        <span className="absolute bottom-1 right-1 text-[0.6rem] text-white bg-black/50 py-[2px] px-[4px] rounded">
                          15:30
                        </span>
                        <div
                          style={{
                            aspectRatio: 1,
                            clipPath: "polygon(0 0,100% 100%,0 100%)",
                            transform: "translateX",
                          }}
                          className="absolute w-2 h-3 left-[99.8%] bottom-0 bg-brown-500"
                        ></div>
                      </div>
                    </div>
                  );
                })}
                {/* <div className="flex justify-end">
                  <div className="max-w-[30rem] bg-brown-500 break-words whitespace-pre-wrap py-1 pb-2 px-3 rounded-xl rounded-r-sm rounded-br-none relative">
                    <h1>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ad perspiciatis voluptatum, exercitationem commodi
                      doloremque repudiandae, repellat libero eos aliquam
                      asperiores explicabo quidem cumque delectus ducimus veniam
                      cupiditate esse. Eos quae dignissimos asperiores minus
                      rerum placeat nihil expedita delectus tempora architecto
                      non nostrum, aliquam a numquam repellendus minima impedit
                      nulla? Labore itaque ipsum cupiditate debitis vel totam
                      sequi dignissimos quo vitae numquam odio incidunt, eaque
                      iure atque. Maiores placeat laboriosam in eum! Reiciendis
                      provident laudantium voluptatum, sint obcaecati quibusdam
                      cupiditate possimus modi. Iusto eaque fugiat ipsam beatae
                      mollitia officia, laboriosam quod minus voluptate ut id
                      harum eligendi illo facere voluptas debitis maxime, ipsum
                      quae. Iusto, optio temporibus tempora vitae at harum eius
                      similique totam officia quia qui aut dolor ullam ad fuga
                      nulla praesentium ipsa! Et fugit odit, recusandae rerum
                      corrupti explicabo mollitia consectetur blanditiis labore
                      enim! Exercitationem natus magnam repellendus consequuntur
                      fuga. Eum suscipit veniam omnis, a excepturi placeat minus
                      quisquam quod ex est odio odit et
                    </h1>
                    <div
                      style={{
                        aspectRatio: 1,
                        clipPath: "polygon(0 0,100% 100%,0 100%)",
                        transform: "translateX",
                      }}
                      className="absolute w-2 h-3 left-[99.8%] bottom-0 bg-brown-500"
                    ></div>{" "}
                    <span className="absolute bottom-3 right-5 text-xs text-white bg-black/50 py-1 px-2 rounded">
                      15:30
                    </span>
                  </div>
                </div> */}
                {/* 
                <div className="flex justify-start">
                  <div className="max-w-[30rem] bg-graysurface break-words whitespace-pre-wrap py-1 pb-2 px-3 rounded-xl rounded-l-sm rounded-bl-none relative ">
                    <h1>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ad perspiciatis voluptatum, exercitationem commodi
                      doloremque repudiandae, repellat libero eos aliquam
                      asperiores explicabo quidem cumque delectus ducimus veniam
                      cupiditate esse. Eos quae dignissimos asperiores minus
                      rerum placeat nihil expedita delectus tempora architecto
                      non nostrum, aliquam a numquam repellendus minima impedit
                      nulla? Labore itaque ipsum cupiditate debitis vel totam
                      sequi dignissimos quo vitae numquam odio incidunt, eaque
                      iure atque. Maiores placeat laboriosam in eum! Reiciendis
                      provident laudantium voluptatum, sint obcaecati quibusdam
                      cupiditate possimus modi. Iusto eaque fugiat ipsam beatae
                      mollitia officia, laboriosam quod minus voluptate ut id
                      harum eligendi illo facere voluptas debitis maxime, ipsum
                      quae. Iusto, optio temporibus tempora vitae at harum eius
                      similique totam officia quia qui aut dolor ullam ad fuga
                      nulla praesentium ipsa! Et fugit odit, recusandae rerum
                      corrupti explicabo mollitia consectetur blanditiis labore
                      enim! Exercitationem natus magnam repellendus consequuntur
                      fuga. Eum suscipit veniam omnis, a excepturi placeat minus
                      quisquam quod ex est odio odit et
                    </h1>
                    <div
                      style={{
                        aspectRatio: 1,
                        clipPath: "polygon(0 100%,100% 0,100% 100%)",
                        transform: "translateX",
                      }}
                      className="absolute w-2 h-3 right-[99.8%] bottom-0 bg-graysurface"
                    ></div>{" "}
                    <span className="absolute bottom-3 right-5 text-xs text-white bg-black/50 py-1 px-2 rounded">
                      15:30
                    </span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[30rem] bg-graysurface break-words whitespace-pre-wrap p-2 rounded-xl rounded-l-sm rounded-bl-none relative cursor-pointer">
                    <img
                      src="src\assets\Demo\Demo.jpg"
                      alt=""
                      className="w-full h-full rounded-lg"
                      onClick={() => {
                        setAssetPreviewTog((prev) => !prev);
                        handleAssetSource("src/assets/Demo/Demo.jpg");
                      }}
                    />
                    <div
                      style={{
                        aspectRatio: 1,
                        clipPath: "polygon(0 100%,100% 0,100% 100%)",
                        transform: "translateX",
                      }}
                      className="absolute w-2 h-3 right-[99.8%] bottom-0 bg-graysurface"
                    ></div>{" "}
                    <span className="absolute bottom-3 right-5 text-xs text-white bg-black/50 py-1 px-2 rounded">
                      15:30
                    </span>
                  </div>
                </div>
                <div className="flex justify-end ">
                  <div className="max-w-[30rem] bg-brown-500 break-words whitespace-pre-wrap p-2 rounded-xl rounded-r-sm rounded-br-none relative cursor-pointer group">
                    <div className="flex gap-1 items-center max-w-full">
                      <div className="relative">
                        <IoDocumentOutline className="xs:size-[4rem] xs:-ml-2 size-[3rem] -ml-1" />
                        <span className="absolute top-1/2 xs:left-[43%] -translate-x-1/2  left-[46%]">
                          <FiDownload
                            className={`xs:size-5 size-4 scale-0 group-hover:scale-100 transition-all -mt-[2px]`}
                          />
                          <span
                            className={`xs:text-[0.7rem] text-[0.5rem] flex scale-100 group-hover:scale-0 absolute top-0 left-0 transition-all`}
                          >
                            .pdf
                          </span>
                        </span>
                      </div>
                      <div className="flex-1 max-w-full flex flex-col xs:gap-1">
                        <div className="inline-flex">
                          <h5 className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[90%]">
                            Practicalfdgdfdggd
                          </h5>
                          <span>.pdf</span>
                        </div>
                        <span className="text-sm opacity-70">344 MB</span>
                      </div>
                    </div>
                    <div
                      style={{
                        aspectRatio: 1,
                        clipPath: "polygon(0 0,100% 100%,0 100%)",
                        transform: "translateX",
                      }}
                      className="absolute w-2 h-3 left-[99.8%] bottom-0 bg-brown-500"
                    ></div>{" "}
                    <span className="absolute bottom-3 right-5 text-xs text-white bg-black/50 py-1 px-2 rounded">
                      15:30
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[30rem] bg-brown-500 break-words whitespace-pre-wrap p-2 rounded-xl rounded-r-sm rounded-br-none relative cursor-pointer">
                    <video
                      src="src/assets/Demo/DemoVideo.mp4"
                      className="w-full rounded-lg"
                      autoPlay
                      controls
                      playsInline
                      onClick={() => {
                        setAssetPreviewTog((prev) => !prev);
                        handleAssetSource("src/assets/Demo/DemoVideo.mp4");
                      }}
                    ></video>
                    <h5 className="max-w-full whitespace-pre-wrap">
                      This is Demo Video Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Eaque fuga tenetur atque doloribus aut
                      modi rem molestias perspiciatis consequuntur numquam?
                    </h5>
                    <div
                      style={{
                        aspectRatio: 1,
                        clipPath: "polygon(0 0,100% 100%,0 100%)",
                        transform: "translateX",
                      }}
                      className="absolute w-2 h-3 left-[99.8%] bottom-0 bg-brown-500"
                    ></div>{" "}
                    <span className="absolute bottom-3 right-5 text-xs text-white bg-black/50 py-1 px-2 rounded">
                      15:30
                    </span>
                  </div>
                </div> */}
              </section>
              <div ref={endChatRef}></div>
            </div>
          </div>
          {/*  */}
          <div
            className={`relative ${
              !sideBarOpen ? "visible w-full !flex" : "invisible w-0 hidden"
            } lg:visible lg:w-full lg:flex transition-all justify-center items-center gap-2 py-[0.5rem]`}
          >
            <div className="xl:max-w-[60%] lg:max-w-[80%] md:max-w-[70%] 2xs:max-w-[80%] flex-1 bg-graysurface rounded-lg rounded-br-none items-center relative">
              <div className="flex flex-1 shadow-lg relative items-end">
                <div className="flex items-center p-2">
                  <Button
                    className={`xs:p-2 p-1 rounded-full hover:bg-graylightsecondarytextcolor
                ${
                  isPickerActivate && "bg-graylightsecondarytextcolor "
                } transition-all cursor-pointer active:text-brown-200`}
                    onClick={handleActivatePicker}
                  >
                    <BsEmojiSmile
                      className={`text-xl text-graysecondarytextcolor ${
                        isPickerActivate && "!text-brown-300"
                      }`}
                    />
                  </Button>
                </div>
                <div className="flex-[1] relative flex items-center m-auto">
                  <textarea
                    // type="text"
                    className=" bg-transparent text-sm caret-brown-200 border-none outline-none relative z-[1] w-full py-2 flex items-center chattextarea"
                    onChange={(e) => handleMsgChange(e)}
                    value={text}
                    wrap="soft"
                    rows="1"
                  />
                  <motion.span
                    className="absolute left-0 origin-right text-graysecondarytextcolor xs:text-base text-sm"
                    animate={{
                      x: !text ? 0 : 15,
                      opacity: !text ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    Message
                  </motion.span>
                </div>
                <div className="flex items-center p-2">
                  <Button
                    className={`xs:p-2 p-1 rounded-full hover:bg-graylightsecondarytextcolor
                ${
                  isUploadOpt && "bg-graylightsecondarytextcolor "
                } transition-all cursor-pointer active:text-brown-200`}
                    onClick={() => setIsUploadOpt((prev) => !prev)}
                  >
                    <GrAttachment
                      className={`text-xl text-graysecondarytextcolor ${
                        isUploadOpt && "!text-brown-300"
                      }`}
                    />
                  </Button>
                </div>
                <div
                  style={{
                    aspectRatio: 1,
                    clipPath: "polygon(0 0,100% 100%,0 100%)",
                    transform: "translateX",
                  }}
                  className="absolute w-2 h-3 left-[99.5%] bottom-0 bg-graysurface"
                ></div>{" "}
              </div>
              <div
                className={`absolute -left-[30rem] bottom-[110%] w-screen h-screen bg-transparent z-10 transition-all ${
                  isPickerActivate
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                onClick={() => setIsPickerActivate(false)}
              >
                <motion.div
                  className="absolute left-[30rem]  origin-bottom-left bottom-0"
                  animate={{
                    scale: isPickerActivate ? 1 : 0,
                    opacity: isPickerActivate ? 1 : 0,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <EmojiPicker
                    theme="dark"
                    lazyLoadEmojis="true"
                    className="EmojiPicker"
                    id="EmojiPicker"
                    width={Max450 ? 300 : 350}
                    height={Max450 ? 400 : 450}
                    onEmojiClick={(e) => handleEmoji(e)}
                  />
                </motion.div>
              </div>
              <div
                className={`absolute w-[100vw] h-[100vh] bg-transparent bottom-0 right-0 z-50 transition-all ${
                  isUploadOpt ? "visible" : "invisible"
                }`}
                onClick={() => setIsUploadOpt(false)}
                onMouseLeave={() => setIsUploadOpt(false)}
              >
                <motion.div
                  className={`bg-graymain w-fit h-fit p-3 flex flex-col gap-2 rounded shadow-lg absolute cursor-pointer origin-bottom-right xs:!bottom-[3.5rem] 2xs:bottom-[3.2rem] right-0 `}
                  onClick={(e) => {
                    setIsUploadOpt(false);
                    e.stopPropagation();
                  }}
                  animate={{
                    opacity: isUploadOpt ? 1 : 0,
                    scale: isUploadOpt ? 1 : 0.3,
                  }}
                >
                  <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                    <HiPhoto className="size-[1.3rem] -mt-[2px]" />
                    <label className="font-medium text-sm" htmlFor="fileInput">
                      Photo or video
                    </label>
                    <input type="file" name="fileInput" id="fileInput" hidden />
                  </div>
                  <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                    <CgFileDocument className="size-[1.3rem] -mt-[2px]" />
                    <label className="font-medium text-sm" htmlFor="docInput">
                      Document
                    </label>
                    <input type="file" name="docInput" id="docInput" hidden />
                  </div>
                </motion.div>
              </div>
            </div>
            {/*  */}
            <Button
              className="xs:p-[1rem] p-[0.7rem] bg-brown-400 rounded-full"
              onClick={handleSend}
            >
              <IoSend className="xs:size-[1.4rem] size-[1.3rem] translate-x-[1px]" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
