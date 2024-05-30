import React from "react";
import { SyncLoader } from "react-spinners";

const LoadCont = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <SyncLoader color="rgb(215 204 200)" />
    </div>
  );
};

export default LoadCont;
