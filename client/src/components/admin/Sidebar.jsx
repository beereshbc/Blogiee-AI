import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div>
      <NavLink
        end={true}
        to="/"
        className={({ isActive }) =>
          `flex py-3 px-3 sm:px-9 gap-3 text-center md:min-w-64 ${
            isActive && `bg-primary/10 border-r-4 font-semibold border-primary `
          }`
        }
      >
        <img src={assets.home_icon} className="w-5 min-w-4" alt="" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/admin/addblog"
        className={({ isActive }) =>
          `flex py-3 px-3 sm:px-9 gap-3 text-center md:min-w-64 ${
            isActive && `bg-primary/10 border-r-4 font-semibold border-primary `
          }`
        }
      >
        <img src={assets.blog_icon} className="w-5 min-w-4" alt="" />
        <p className="hidden md:inline-block">Add blogs</p>
      </NavLink>
      <NavLink
        to="/admin/listblog"
        className={({ isActive }) =>
          `flex py-3 px-3 sm:px-9 gap-3 text-center md:min-w-64 ${
            isActive && `bg-primary/10 border-r-4 font-semibold border-primary `
          }`
        }
      >
        <img src={assets.home_icon} className="w-5 min-w-4" alt="" />
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>
      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex py-3 px-3 sm:px-9 gap-3 text-center md:min-w-64 ${
            isActive && `bg-primary/10 border-r-4 font-semibold border-primary `
          }`
        }
      >
        <img src={assets.comment_icon} className="w-5 min-w-4" alt="" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
