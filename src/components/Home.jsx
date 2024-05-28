import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  const name = localStorage.getItem("name");
  const handleLogout = () => {
    localStorage.removeItem("name");
    Navigate('/')
  };
  return (
    <div>
      <h1>{name}</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Home;
