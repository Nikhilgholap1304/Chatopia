import React, { useState } from "react";
import Demo from "../assets/Demo.jpg";
import "./style/style.scss";
import { Avatar, Button } from "@material-tailwind/react";
import Ripples from "react-ripples";
import { FaPen } from "react-icons/fa6";
import { motion } from "framer-motion";

const ChatList = ({ searchActive }) => {
  return (
    <>
      <motion.section
        className={`flex flex-col w-full h-screen overflow-x-hidden chatlist pb-[3.7rem] relative`}
        animate={{
          x: searchActive ? '100%' : 0,
          opacity: searchActive ? 0 : 1
        }}
        transition={{
          duration : 0.1
        }}
      >
        <div
          className={`flex hover:bg-graylightsecondarytextcolor cursor-pointer relative `}
        >
          <Ripples
            className="absolute w-full h-full flex p-2 gap-2 items-center"
            during={1200}
          >
            <div className="border-2 border-brown-200 rounded-full">
              <Avatar src={Demo} className="min-w-[3rem]" />
            </div>
            <div className="flex flex-col justify-center w-full">
              <div className="flex justify-between">
                <h5 className="leading-5">Arjun Pandey</h5>
                <p className="text-xs leading-3">15:35</p>
              </div>
              <div className="flex justify-between items-center">
                <p
                  className="text-nowrap max-w-[17rem] whitespace-nowrap
              text-ellipsis overflow-hidden text-base text-graysecondarytextcolor"
                >
                  This message couldnt be displayed and all
                </p>
                <span className="bg-brown-500 size-6 grid place-content-center rounded-full leading-4 text-sm">
                  5
                </span>
              </div>
            </div>
          </Ripples>
        </div>
        
      </motion.section>
    </>
  );
};

export default ChatList;
