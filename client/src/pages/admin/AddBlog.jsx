import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Required for Quill styling
import { motion } from "motion/react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";
import Loader from "../../components/Loader";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [image, setImage] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [category, setCategory] = useState("Startup");
  const [isAdding, setIsAdding] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  const { axios } = useAppContext();

  const editerRef = useRef(null);
  const quillRef = useRef(null);

  const genarateContent = async () => {
    if (!title) {
      return toast.error("Please must enter the title");
    }
    try {
      setIsLoding(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      console.log(data);

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoding(false);
    }
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formdata = new FormData();
      formdata.append("blog", JSON.stringify(blog));
      formdata.append("image", image);

      const { data } = await axios.post("/api/blog/add", formdata);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editerRef.current) {
      quillRef.current = new Quill(editerRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={submitHandler}
      className="flex-1 bg-blue-50/50 pt-5 px-4 sm:px-10 h-full overflow-y-scroll pb-16"
    >
      <div className="bg-white max-w-3xl mx-auto rounded-lg p-6 sm:p-10">
        {/* Thumbnail Upload */}
        <p className="text-gray-600 font-semibold mb-2">Upload thumbnail</p>
        <label htmlFor="image">
          <img
            className="cursor-pointer w-full max-w-xs rounded-lg"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Upload Thumbnail"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            hidden
            required
            id="image"
          />
        </label>

        {/* Blog Title */}
        <p className="mt-5 text-gray-600 font-semibold text-lg">Blog title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="outline-none border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
          type="text"
        />

        {/* Sub Title */}
        <p className="mt-5 text-gray-600 font-semibold text-lg">Sub title</p>
        <input
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
          className="outline-none border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
          type="text"
        />

        {/* Quill Editor */}
        <p className="mt-5 text-gray-600 font-semibold text-lg">
          Blog description
        </p>
        <div className="relative border border-gray-300 rounded-md mt-2 h-[500px] overflow-hidden">
          <div ref={editerRef} className="h-full" />
          {isLoding && (
            <div className="absolute top-10 bottom-2 right-0 left-0 flex items-center justify-center bg-black/a0 mt-2">
              <div>
                <Loader />
              </div>
            </div>
          )}
          <button
            disabled={isLoding}
            type="button"
            onClick={genarateContent}
            className="absolute bottom-1 right-2 text-sm bg-indigo-100 border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-200 transition"
          >
            Generate with AI
          </button>
        </div>
        <p className="mt-5 text-gray-600 font-semibold text-lg">Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="p-2 outline-none text-gray-600 border rounded cursor-pointer border-gray-500"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex gap-4 text-center ">
          <p className="mt-5 text-gray-600 font-semibold text-lg">
            Publish Now
          </p>
          <input
            className="text-center w-5 items-center mb-[-20px] flex justify-center"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <motion.button
          disabled={isAdding}
          whileHover={{ scale: 1.1, color: "#fff" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-4 py-1 mt-10 border border-indigo-300 rounded my-2 mx-2 bg-primary text-white  "
          type="submit"
        >
          {isAdding ? "Adding...." : "Add Blog"}
        </motion.button>
      </div>
    </form>
  );
};

export default AddBlog;
