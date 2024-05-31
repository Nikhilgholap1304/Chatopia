import React, { useEffect, useState } from "react";
import { FaBars, FaRegUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { IconButton } from "@material-tailwind/react";

const SideBar = () => {
  const [input, setInput] = useState("");
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    console.log(menuActive);
  }, [menuActive]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="min-w-[25rem] h-screen border border-r-2 border-grayborder bg-graysurface overflow-hidden">
      <div className="w-full h-full">
        <div className="border-b-2 px-5 py-2 border-grayborder flex gap-2 items-center">
          <IconButton
            className={`hover:bg-graylightsecondarytextcolor p-5 ${
              menuActive ? "bg-graylightsecondarytextcolor" : ""
            }`}
          >
            <FaBars className="w-5 h-5 text-graysecondarytextcolor" />
          </IconButton>
          <div className="absolute bg-transparent left-0 top-0 w-screen h-screen z-50">
            <div className="bg-graymain w-fit h-fit p-2 flex flex-col gap-2 rounded shadow-lg translate-x-4 absolute left-0 top-[3.3rem] cursor-pointer">
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-1 rounded transition-colors">
                <FaRegUser />
                <span>Profile</span>
              </div>
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-1 rounded transition-colors">
                <FaRegUser />
                <span>Profile</span>
              </div>
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-1 rounded transition-colors">
                <FaRegUser />
                <span>Profile</span>
              </div>
              <div className="flex gap-3 items-center hover:bg-graylightsecondarytextcolor px-5 py-1 rounded transition-colors">
                <FaRegUser />
                <span>Profile</span>
              </div>
            </div>
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
        <div>chatlist</div>
      </div>
    </div>
  );
};

export default SideBar;
