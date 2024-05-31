import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { IconButton } from "@material-tailwind/react";

const SideBar = () => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="min-w-[25rem] h-screen border border-r-2 border-grayborder bg-graysurface overflow-hidden">
      <div className="w-full h-full">
        <div className="border-b-2 px-5 py-2 border-grayborder flex gap-2 items-center">
          <IconButton className="hover:bg-graylightsecondarytextcolor p-5">
            <FaBars className="w-5 h-5 text-graysecondarytextcolor" />
          </IconButton>
          <div className="relative overflow-hidden w-full items-center flex h-10 z-[1]">
            <input
              type="text"
              className="w-full px-10 h-full flex-1 bg-graymain border-[1px] border-solid border-grayinputborder outline-none text-base caret-brown-200 relative z-[1] rounded-full peer"
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
              <IconButton className="rounded-full hover:bg-graylightsecondarytextcolor bg-transparent text-inherit">
                <IoCloseOutline className={`w-6 h-6`} />
              </IconButton>
            </motion.button>
            <motion.span
              className={`absolute z-[1] ml-10 pointer-events-none text-graysecondarytextcolor text-sm`}
              animate={{
                opacity: input ? 0 : 1,
                scale: input ? 0.5 : 1,
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
