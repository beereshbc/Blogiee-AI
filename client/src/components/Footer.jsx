import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col text-center justify-center bg-indigo-100 px-[7%] pt-4">
      <div className="flex  flex-wrap justify-between items-center w-full ">
        <div className="flex flex-col mb-10">
          <img src={assets.logo} alt="" className="w-16 sm:w-20" />
          <p className="w-96 text-start text-gray-600 text-sm mt-4">
        
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg mb-4">Navlinks</p>
          <ul className="text-sm font-medium text-gray-600 cursor-pointer">
            <li onClick={() => navigate("/profile")}>Profile</li>
            <li onClick={() => navigate("/")}>Home</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg mb-4">
            Social Media
          </p>
          <ul className="text-sm font-medium text-gray-600 cursor-pointer mb-1">
            <li onClick={() => navigate("/")}>LinkdIn</li>
            <li onClick={() => navigate("/")}>GitHub</li>
            <li onClick={() => navigate("/")}>Website</li>
          </ul>
        </div>
      </div>

      <p className="text-sm font-medium text-gray-600 my-3">
        Copyright 2025 © Blogiee-AI All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
