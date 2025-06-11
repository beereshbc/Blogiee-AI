import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        className="w-10 sm:w-16  cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <button
        onClick={() => navigate("/admin")}
        className="flex gap-2 bg-primary text-white p-2 rounded-full px-10 cursor-pointer items-center "
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} className="w-3" alt="" />
      </button>
    </div>
  );
};

export default Navbar;
