import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const { createdAt, title } = blog;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deletBlog = async () => {
    const confirm = window.confirm("Are you sure to delete this blog 💀");
    if (!confirm) {
      return;
    }
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-4 py-3">{index + 1}</td>
      <td className="px-4 py-3">{title}</td>
      <td className="px-4 py-3 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-4 py-3 max-sm:hidden">
        <span
          className={`${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Un-Published"}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-3 items-center text-xs">
          <button
            onClick={togglePublish}
            className="border px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
          >
            {blog.isPublished ? "UnPublish" : "Publish"}
          </button>
          <img
            onClick={deletBlog}
            className="w-6 hover:scale-110 transition-all cursor-pointer"
            src={assets.cross_icon}
            alt="Delete"
          />
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
