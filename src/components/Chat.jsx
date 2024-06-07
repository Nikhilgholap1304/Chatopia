import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import {
  IoCallOutline,
  IoEllipsisVertical,
  IoSearch,
  IoSend,
} from "react-icons/io5";
import Demo from "../assets/Demo.jpg";
import { FaArrowLeft } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { BsCameraVideo, BsEmojiSmile } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";

const Chat = ({ setSideBarOpen, sideBarOpen }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [isMsg, setIsMsg] = useState("");
  const Max1080 = useMediaQuery({
    query: "(max-width: 1080px)",
  });
  const handleIsMsgChange = (e) => {
    setIsMsg(e.target.value);
  };
  return (
    <div
      className={`w-full h-full flex-2 2xs:translate-x-[100vw] 2xs:flex-[0] lg:!translate-x-0 lg:!flex-1 lg:!w-full flex flex-col relative transition-all ${
        !sideBarOpen && "2xs:!translate-x-0 2xs:flex-[1]"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #322200, #372701, #3d2b01, #423001, #473501, #4c3901, #523e01, #574201, #5e4701, #654b01, #6c5000, #735500",
      }}
    >
      <div className="bg-[url('./assets\bgImages\designBg1.png')] absolute inset-0 -z-[1]" />
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
          <div className="size-[3rem] xs:!size-[3rem] 2xs:size-[2.3rem]">
            <Avatar
              src={Demo}
              name="A"
              round
              size="100%"
              className="border-brown-200 border border-t"
              color="rgb(141 110 99)"
            />
          </div>
          <div className="flex gap-1 justify-center flex-col">
            <h3 className="xs:!leading-5 2xs:leading-none xs:!text-base 2xs:text-sm">
              Yash Saundalkar
            </h3>
            <p className="text-nowrap whitespace-nowrap overflow-hidden leading-none text-sm text-graysecondarytextcolor 2xs:text-xs xs:!text-sm">
              last seen May 8 at 10:17
            </p>
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
      <div className="flex-1"></div>
      <div
        className={`relative ${
          !sideBarOpen ? "visible w-full flex" : "invisible w-0 hidden"
        } lg:visible lg:w-full lg:flex transition-all justify-center items-center gap-2 py-[0.5rem]`}
      >
        <div className="xl:max-w-[60%] lg:max-w-[80%] md:max-w-[70%] 2xs:max-w-[80%] flex-1 bg-graysurface rounded-lg rounded-br-none items-center">
          <div className="flex flex-1 shadow-lg relative items-end">
            <div className="flex items-center p-2">
              <Button className="xs:p-2 p-1 rounded-full hover:bg-graylightsecondarytextcolor transition-all cursor-pointer active:text-brown-200">
                <BsEmojiSmile className="text-xl text-graysecondarytextcolor" />
              </Button>
            </div>
            <div className="flex-[1] relative flex items-center m-auto">
              <textarea
                // type="text"
                className=" bg-transparent text-sm caret-brown-200 border-none outline-none relative z-[1] w-full py-2 flex items-center"
                onChange={(e)=>handleIsMsgChange(e)}
                value={isMsg}
                wrap="soft"
                rows="1"
              />
              <motion.span
                className="absolute left-0 origin-right text-graysecondarytextcolor xs:text-base text-sm"
                animate={{
                  x: !isMsg ? 0 : 15,
                  opacity: !isMsg ? 1 : 0,
                }}
                transition={{
                  duration: 0.2
                }}
              >
                Message
              </motion.span>
            </div>
            <div className="flex items-center p-2">
              <Button className="xs:p-2 p-1 rounded-full hover:bg-graylightsecondarytextcolor transition-all active:text-brown-200">
                <GrAttachment className="text-xl cursor-pointer text-graysecondarytextcolor" />
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
        </div>
        <Button className="xs:p-[1rem] p-[0.7rem] bg-brown-400 rounded-full">
          <IoSend className="xs:size-[1.4rem] size-[1.3rem] translate-x-[1px]" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
