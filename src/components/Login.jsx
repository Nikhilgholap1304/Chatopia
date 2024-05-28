import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import {auth, provider} from "../lib/firebase";
import {signInWithPopup} from "firebase/auth";

const Login = () => {
  const [loading, setLoading] = useState(null);
  const [value, setValue] = useState('')
  const handleClick = (id) => {
    setLoading(id);
    
    if(id===1){
      signInWithPopup(auth, provider).then((data)=>{
        setValue(data.user.email)
        localStorage.setItem("email: ", data.user.email)
        setLoading(null);
      }).catch((error)=>{
        console.error("Error logging in with Goggle", error);
        setLoading(null);
      })
    }
  };
  useEffect(()=>{
    setValue(localStorage.getItem("email"))
  })
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative">
        <div className="bg-[url('./assets/bgImages/designBg1.png')] absolute top-0 left-0 bottom-0 w-full "></div>
        <div className="w-fit h-fit flex items-center justify-center flex-col gap-5 bg-dark2 border border-brown-700 p-7 rounded-md shadow-lg scale-[0.95] xs:scale-100">
          <h1 className="font-roboto text-2xl mb-5">
            Welcome to <span className="font-adventPro text-3xl font-bold">Chatopia</span>
          </h1>
          <Button
            size="lg"
            variant="outlined"
            className={`flex items-center gap-3 bg-gray-900 text-brown-200 rounded-md w-full justify-center ${
              loading === 1 ? "" : "p-1 pr-4"
            }`}
            loading={loading === 1 && true}
            onClick={() => handleClick(1)}
            disabled={(loading === 2 && true) || (loading === 1 && true)}
          >
            {loading == 1 ? (
              ""
            ) : (
              <>
                <div className="w-10 h-10 bg-primary grid place-items-center rounded">
                  <img
                    src="https://docs.material-tailwind.com/icons/google.svg"
                    alt="metamask"
                    className="h-6 w-6"
                  />
                </div>
                Continue with Google
              </>
            )}
          </Button>
          <div className="flex gap-2 items-center w-full justify-between">
            <span className="w-full h-[0.1px] rounded bg-accent"></span>
            <p>or</p>
            <span className="w-full h-[0.1px] rounded bg-accent"></span>
          </div>
          <Button
            size="lg"
            variant="outlined"
            className={`flex items-center gap-3 bg-gray-900 text-brown-200 rounded-md w-full justify-center ${
              loading === 2 ? "" : "p-1 pr-4"
            }`}
            loading={loading === 2 && true}
            onClick={() => handleClick(2)}
            disabled={(loading === 2 && true) || (loading === 1 && true)}
          >
            {loading == 2 ? (
              ""
            ) : (
              <>
                <div className="w-10 h-10 grid place-items-center rounded-sm">
                  <FaGithub className="h-6 w-6" />
                </div>
                Continue with Github
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
