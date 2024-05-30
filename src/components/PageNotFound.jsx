import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div class="text-center flex flex-col justify-center h-screen">
        <Link to="/">
          <div className="mb-10 flex justify-center items-center gap-1">
            <div className="h-[2.5rem] w-[2.5rem]">
              <img src={`/Chatopia.png`} alt="chatopia" />
            </div>
            <span className="font-adventPro text-3xl font-bold">Chatopia</span>
          </div>
        </Link>
        <h1 class="mb-4 text-6xl font-semibold text-brown-100">404</h1>
        <p class="mb-4 text-lg text-brown-400">Oops! Looks like you're lost.</p>
        <div class="animate-bounce">
          <svg
            class="mx-auto h-16 w-16 text-brown-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p class="mt-4 text-brown-400 inline-flex justify-center">
          Let's get you &nbsp;
          <Link
            to="/"
            class="text-brown-50 scale-105 hover:scale-[1.1] transition-transform"
          >
            back
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default PageNotFound;
