import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center items-center flex-col">
      <label htmlFor="" className="mb-5 font-semibold text-2xl animate-pulse">
        Loading <span className="animate-ping">.</span>
        <span className="animate-ping">.</span>
        <span className="animate-ping">.</span>
      </label>
      <div className="border-spacing-72 border-t-white border-8 border-t-0 border-b-0 border-r-0 shadow-lg  justify-center flex items-center  rounded-full border-primary h-24 w-24 animate-spin text-center"></div>
    </div>
  );
};

export default Loader;
