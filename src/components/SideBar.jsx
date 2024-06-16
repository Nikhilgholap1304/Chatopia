import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBars,
  FaPen,
  FaRegUser,
  FaUser,
  FaUserGroup,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import {
  IoClose,
  IoCloseOutline,
  IoSearchOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";
import { Button, IconButton } from "@material-tailwind/react";
import { FiLogOut, FiUser } from "react-icons/fi";
import ChatList from "./ChatList";
import SearchList from "./SearchList";
import { useMediaQuery } from "react-responsive";

const SideBar = ({ sideBarOpen, setSideBarOpen, logout }) => {
  const [input, setInput] = useState("");
  const [menuActive, setMenuActive] = useState(false);
  const [bottomMenu, setBottomMenu] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const Max1080 = useMediaQuery({
    query: "(max-width: 1080px)",
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleMenuActive = () => {
    if (searchActive) {
      setSearchActive(false);
      setInput("");
    } else {
      setMenuActive(!menuActive);
    }
  };

  return (
    <motion.div
      className={`2xs:w-[100%] border-r-0 lg:border-r-2 w-[25rem] h-[100%] border-grayborder bg-graysurface overflow-hidden relative lg:max-w-[25rem] origin-center ${
        !sideBarOpen && "!border-none"
      }`}
      initial={{ flex: 0 }}
      animate={{
        // x:!sideBarOpen ? -100 : 0,
        flex: sideBarOpen ? 1 : 0,
      }}
      transition={{
        duration: Max1080 ? 0.2 : 0.3,
      }}
    >
      <div className="w-full h-full relative">
        <div className="px-2 py-2 gap-1 sm:px-3 sm:py-2 flex xs:gap-2 items-center">
          <IconButton
            className={`hover:bg-graylightsecondarytextcolor p-5 ${
              menuActive ? "bg-graylightsecondarytextcolor" : ""
            }`}
            onClick={handleMenuActive}
          >
            <div
              className="w-full h-full"
              onClick={() => searchActive && setSearchActive(false)}
            >
              <FaArrowLeft
                className={`w-5 h-5 text-graysecondarytextcolor translate-y-1/2 transition-all ease-in-out duration-200 ${
                  searchActive
                    ? "scale-100 opacity-1 visible rotate-0"
                    : "scale-50 opacity-0 invisible rotate-90"
                }`}
              />
              <FaBars
                className={`w-5 h-5 text-graysecondarytextcolor -translate-y-1/2 transition-all ease-in-out duration-200 ${
                  searchActive
                    ? "scale-50 opacity-0 invisible rotate-90"
                    : "scale-100 opacity-1 visible rotate-0"
                }`}
              />
            </div>
          </IconButton>
          <div
            className={`fixed bg-[rgba(0,0,0,0.17)] left-0 top-0 right-0 w-screen h-screen z-50 ${
              menuActive ? "visible" : "invisible"
            } transition-all`}
            onClick={handleMenuActive}
          >
            <motion.div
              className={`bg-gray-900 w-fit h-fit p-3 flex flex-col gap-2 rounded shadow-lg translate-x-4 absolute left-0 top-[3.3rem] cursor-pointer origin-top-left z-1`}
              // onClick={(e)=>e.stopPropagation()}
              animate={{
                x: 13,
                opacity: menuActive ? 1 : 0,
                scale: menuActive ? 1 : 0.8,
              }}
            >
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                <FiUser className="size-[1.2rem] -mt-[2px]" />
                <span className="font-medium text-sm">Profile</span>
              </div>
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                <IoSettingsOutline className="size-[1.2rem]" />
                <span className="font-medium text-sm">Settings</span>
              </div>
              <hr className="text-grayinputborder border-grayinputborder" />
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]" onClick={logout}>
                <FiLogOut className="size-[1.2rem]" />
                <span className="font-medium text-sm">Logout</span>
              </div>
            </motion.div>
          </div>
          <div
            className="relative overflow-hidden w-full items-center flex h-10 z-[1]"
            onClick={() => setSearchActive(true)}
          >
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
        <div className="flex relative h-full w-full">
          <ChatList
            searchActive={searchActive}
            setSideBarOpen={setSideBarOpen}
            sideBarOpen={sideBarOpen}
            setSearchActive = {setSearchActive}
          />
          <SearchList searchActive={searchActive} input={input} setInput={setInput} setSearchActive = {setSearchActive}/>
        </div>
        <div className="absolute bottom-5 right-5">
          <motion.div
            className="relative flex justify-center"
            animate={{
              y: searchActive ? 100 : 0,
            }}
          >
            <Button
              className={`bg-brown-400 rounded-full size-[3.7rem] hover:bg-brown-500 transition-colors active:bg-brown-600 flex items-center justify-center`}
              onClick={() => setBottomMenu(!bottomMenu)}
            >
              <FaPen
                className={`size-5 p-0 absolute transition-all ${
                  bottomMenu ? "scale-0" : "scale-100"
                }`}
              />
              <IoClose
                className={`size-8 p-0 absolute transition-all ${
                  bottomMenu ? "scale-100" : "scale-0"
                }`}
              />
            </Button>
            <div
              className={`absolute w-[100vw] h-[100vh] bg-transparent bottom-0 -right-10 z-50 transition-all ${
                bottomMenu ? "visible" : "invisible"
              }`}
              onClick={() => setBottomMenu(false)}
              onMouseLeave={() => setBottomMenu(false)}
            >
              <motion.div
                className={`bg-graymain w-fit h-fit p-3 flex flex-col gap-2 rounded shadow-lg absolute cursor-pointer origin-bottom-right bottom-20 right-10 `}
                onClick={(e) => {
                  setBottomMenu(false);
                  e.stopPropagation();
                }}
                animate={{
                  opacity: bottomMenu ? 1 : 0,
                  scale: bottomMenu ? 1 : 0.3,
                }}
              >
                <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                  <FaUserGroup className="size-[1.3rem] -mt-[2px]" />
                  <span className="font-medium text-sm">New Group</span>
                </div>
                <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-2 rounded transition-all active:scale-[0.95]">
                  <FaRegUser className="size-[1.2rem] -mt-[2px]" />
                  <span className="font-medium text-sm">New Private Chat</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SideBar;
