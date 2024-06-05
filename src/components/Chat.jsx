import { IconButton } from "@material-tailwind/react";
import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { IoCallOutline, IoEllipsisVertical, IoSearch } from "react-icons/io5";
import Demo from "../assets/Demo.jpg";
import { FaArrowLeft } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";


const Chat = ({ setSideBarOpen, sideBarOpen }) => {
  const Max1080 = useMediaQuery({
    query: "(max-width: 1080px)",
  });
  return (
    <div
      className={`w-full h-full flex-2 2xs:translate-x-[100vw] 2xs:flex-[0] lg:!translate-x-0 lg:!flex-1 lg:!w-full flex relative transition-all ${
        !sideBarOpen && "2xs:!translate-x-0 2xs:flex-[1]"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #322200, #372701, #3d2b01, #423001, #473501, #4c3901, #523e01, #574201, #5e4701, #654b01, #6c5000, #735500",
      }}
    >
      <div className="bg-[url('./assets\bgImages\designBg1.png')] absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 bg-graysurface w-full 2xs:px-2 sm:px-4 md:px-5 py-2 shadow flex justify-between items-center gap-3 cursor-pointer">
        <div className="flex gap-2 items-center justify-center">
          <IconButton
            className={`hover:bg-graylightsecondarytextcolor xs:!p-5 2xs:p-2 ${Max1080 ? 'flex' : 'hidden'}`}
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
            <IconButton className={`hover:bg-graylightsecondarytextcolor p-5 2xs:p-3 sm:!p-5 `}>
              <IoEllipsisVertical className="size-6 2xs:size-5 xs:!size-6 text-graysecondarytextcolor" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
