import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = async () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["authorization"] = "";
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center  justify-between py-2 border-b-2 border-gray-200 px-4 sm:px-10">
        <img
          onClick={() => navigate("/")}
          className="w-16 sm:w-16 cursor-pointer"
          src={assets.logo}
          alt=""
        />
        <p
          onClick={logout}
          className="bg-primary cursor-pointer text-white py-2 px-8 border rounded-full inline-block"
        >
          Logout
        </p>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <div className=" border-r border-gray-200 ">
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
