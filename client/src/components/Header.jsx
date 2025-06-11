import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { setInput, input } = useAppContext();

  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    inputRef.current.value = "";
    setInput("");
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative ">
      <div className="text-center mt-20 mb-8">
        <div className="bg-indigo-100 py-2.5 px-6 mb-4 inline-flex items-center gap-4 border text-sm text-primary rounded-full justify-center border-primary/40">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="" />
        </div>
        <h1 className="text-gray-700 text-3xl sm:text-6xl sm:leading-[60px] font-semibold">
          Your own <span className="text-primary">blogging</span> <br />{" "}
          platform.
        </h1>
        <p className="text-gray-500 my-6 sm:my-8 m-auto max-sm:text-xs text-sm">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it’s <br />
          one word or a thousand, your story starts right here.
        </p>
        <form
          onSubmit={onSubmitHandler}
          action=""
          className="flex mx-auto border-gray-300 bg-white justify-between max-sm:scale-75 border max-w-lg rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            className="w-full pl-4 outline-none"
            type="text"
            placeholder="Search blogs"
          />
          <button className="bg-primary px-8 py-2 m-1.5 rounded-md hover:scale-105 transition-none cursor-pointer text-white">
            Search
          </button>
        </form>
      </div>
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-10 opacity-50"
        alt=""
      />
      {input && (
        <div className="flex justify-center items-center text-center ">
          {input && (
            <button
              className="border border-black px-4 py-1 rounded cursor-pointer w-40 mx-auto"
              onClick={onClear}
            >
              Clear text
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
