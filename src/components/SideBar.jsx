import React, { useEffect, useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import {
  IoCloseOutline,
  IoSearchOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";
import { IconButton } from "@material-tailwind/react";
import { FiLogOut, FiUser } from "react-icons/fi";
import ChatList from "./ChatList";

const SideBar = () => {
  const [input, setInput] = useState("");
  const [menuActive, setMenuActive] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="min-w-[25rem] w-[25rem] h-screen border border-r-2 border-grayborder bg-graysurface overflow-hidden">
      <div className="w-full h-full">
        <div className=" px-5 py-2 flex gap-2 items-center">
          <IconButton
            className={`hover:bg-graylightsecondarytextcolor p-5 ${
              menuActive ? "bg-graylightsecondarytextcolor" : ""
            }`}
            onClick={handleMenuActive}
          >
            <FaBars className="w-5 h-5 text-graysecondarytextcolor" />
          </IconButton>
          <div
            className={`absolute bg-transparent left-0 top-0 w-screen h-screen z-50 ${
              menuActive ? "visible" : "invisible"
            } transition-all`}
            onClick={handleMenuActive}
          >
            <motion.div
              className={`bg-graymain w-fit h-fit p-3 flex flex-col gap-2 rounded shadow-lg translate-x-4 absolute left-0 top-[3.3rem] cursor-pointer origin-top-left z-1`}
              // onClick={(e)=>e.stopPropagation()}
              animate={{
                x: 22,
                opacity: menuActive ? 1 : 0,
                scale: menuActive ? 1 : 0.8,
              }}
            >
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-colors active:scale-[0.95]">
                <FiUser className="w-[1rem] h-[1rem] -mt-[2px]" />
                <span className="font-medium text-sm">Profile</span>
              </div>
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-colors active:scale-[0.95]">
                <IoSettingsOutline className="w-[1rem] h-[1rem]" />
                <span className="font-medium text-sm">Settings</span>
              </div>
              <hr className="text-grayinputborder border-grayinputborder" />
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-colors active:scale-[0.95]">
                <FiLogOut className="w-[1rem] h-[1rem]" />
                <span className="font-medium text-sm">Logout</span>
              </div>
            </motion.div>
          </div>
          <div className="relative overflow-hidden w-full items-center flex h-10 z-[1]">
            <input
              type="text"
              className="w-full px-10 h-full flex-1 bg-graymain border-[1px] border-solid border-grayinputborder hover:border-gray-600 outline-none text-base caret-brown-200 relative z-[1] rounded-full peer transition-colors duration-300"
              onChange={(e) => handleChange(e)}
              value={input}
            />
            <span className="absolute inset-0 border-[2px] z-[1] rounded-full border-transparent peer-focus:border-brown-200 pointer-events-none transition-colors" />
            <IoSearchOutline className="w-5 h-5 absolute mx-3 z-[1] text-graysecondarytextcolor peer-focus:text-brown-200" />
            <motion.button
              className={`absolute right-0 mr-1 z-[1]
            peer-focus:text-brown-200 text-graysecondarytextcolor ${
              !input && "hidden"
            }`}
              animate={{
                opacity: input ? 1 : 0,
                x: input ? 0 : 10,
              }}
            >
              <IconButton
                className="rounded-full hover:bg-graylightsecondarytextcolor bg-transparent text-inherit"
                onClick={() => setInput("")}
              >
                <IoCloseOutline className={`w-6 h-6`} />
              </IconButton>
            </motion.button>
            <motion.span
              className={`absolute z-[1] ml-10 pointer-events-none text-graysecondarytextcolor text-sm`}
              animate={{
                opacity: input ? 0 : 1,
                scale: input ? 0.7 : 1,
                transformOrigin: !input ? "left center" : "center",
              }}
              transition={{
                opacity: { duration: 0.1 },
              }}
            >
              Search
            </motion.span>
          </div>
        </div>
        <ChatList />
      </div>
    </div>
  );
};

export default SideBar;
