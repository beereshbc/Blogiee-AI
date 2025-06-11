import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex justify-center items-center flex-col mb-20 sm:mb-40 mt-10 w-full">
      <h1 className="font-medium text-gray-800 text-2xl sm:text-3xl">
        Never Miss a Blog!
      </h1>
      <p className="text-gray-500 sm:text-sm text-xs my-3 mb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      <form
        action=""
        className="flex w-xl max-w-2xl items-center justify-center sm:w-full h-12 md:h-14"
      >
        <input
          type="email"
          className="max-w-2xl outline-none text-gray-800 border px-4 py-2 w-full border-r-0 rounded-r-none border-gray-300 rounded-l-md"
          placeholder="Enter your email id"
          required
        />
        <button className="bg-primary px-4 py-2 border rounded-l-none rounded-md text-white">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
