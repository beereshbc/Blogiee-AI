import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import ShareButtons from "../components/ShareButtons";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const { axios } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  const fullUrl = window.location.href;

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        content,
        name,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative ">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -z-10 -top-50 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary font-semibold mb-4">
          Published on {Moment(data.createdAt).format("MMMM do YYYY")}
        </p>
        <h1
          className="text-3xl md:text-5xl lg:text-6xl max-w-4xl mx-auto text-gray-700 mb-6 px-3
         font-semibold"
        >
          {data.title}
        </h1>
        <p className="sm:text-lg text-gray-600 truncate text-md px-5">
          {data.subTitle}
        </p>
        <p className="px-8 py-1.5 border border-primary text-primary bg-indigo-100 inline-block rounded-full mt-4">
          {"Beeresh"}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center my-20 w-full px-4">
        <img
          src={data.image}
          className="sm:max-w-5xl max-w-96 rounded-2xl"
          alt=""
        />
        <div className="flex flex-col mx-auto items-center justify-center">
          <h1 className="py-6 text-2xl md:text-3xl max-w-2xl text-center font-semibold">
            {data.title}
          </h1>
          <p
            className="flex flex-col rich-text mx-auto text-start max-w-3xl justify-center"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></p>
        </div>
      </div>

      {/* Comment section*/}

      <div className="mt-14 mx-4 mb-10 sm:mx-auto max-w-2xl">
        <p className="font-semibold my-2 mb-5 text-center">
          Comments({comments.length})
        </p>
        <div className="flex flex-col gap-4">
          {comments.map((item, index) => (
            <div className="bg-primary/2 border border-primary/6 text-gray-600 gap-4 p-4 rounded-lg relative">
              <div className="flex gap-4 mb-2 text-center items-center font-semibold">
                <img className="w-6" src={assets.user_icon} alt="" />
                <p>{item.name}</p>
              </div>
              <p className="text-sm max-w-xl ml-8">{item.content}</p>
              <div className="absolute text-xs bottom-3 right-4 items-center">
                <p>{Moment(item.createdAt).fromNow()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commet section */}

      <div className="max-w-3xl mx-4 flex flex-col justify-center text-center items-center sm:mx-auto">
        <p className="mb-5 font-medium text-lg">Add Your Comment</p>
        <form
          onSubmit={addComment}
          className="flex flex-col mb-10 text-center w-full gap-y-6 "
          action=""
        >
          <input
            className="p-2 outline-none border border-primary/20 rounded-md"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            required
          />
          <textarea
            className="p-2 outline-none border border-primary/20 min-h-44 rounded-md"
            placeholder="Write comment here"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            required
          ></textarea>
          <button
            className="p-2 outline-none border max-w-44 text-center mx-auto px-10 hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="text-center">
        <p className="font-semibold mb-4 text-lg">
          Share this article on social media
        </p>
        <div>
          <ShareButtons title={data.title} key={data._id} url={fullUrl} />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Blog;
