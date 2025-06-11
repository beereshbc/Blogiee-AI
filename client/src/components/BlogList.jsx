import React, { useEffect, useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    filteredBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center relative my-10 gap-4 sm:gap-8">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={` cursor-pointer ${
                menu === item && "text-black px-4 py-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 700, damping: 20 }}
                  className="absolute top-0 right-0 h-7 -z-10  rounded-lg left-0"
                >
                  <div className="relative z-0">
                    <p className=" absolute left-2 h-2 w-2 top-2 rounded-full bg-primary"></p>
                    <p className=" absolute top-4 right-2 h-2 w-2 rounded-full bg-orange-500"></p>
                    <p className=" absolute bottom-0 top-1 right-2 h-2 w-2 rounded-full bg-purple-900"></p>
                    <p className=" absolute left-4 bottom-0 top-1 right-2 h-2 w-2 rounded-full bg-yellow-400"></p>
                    <p className=" absolute  bottom-3 top-2 right-8 h-2 w-2 rounded-full bg-black"></p>
                  </div>
                </motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40 mx-8">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
3;
