import fs from "fs";
import imagekit from "../config/imageKit.js";
import BlogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";
import main from "../config/gemini.js";

const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, isPublished, category } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Details are missing" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // For URL Generation, works for both images and videos
    var imageURL = imagekit.url({
      path: response.filePath,

      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = imageURL;

    await BlogModel.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog is not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await BlogModel.findByIdAndDelete(id);
    await commentModel.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ success: false, message: "Id Is required" });
    }
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog is not found" });
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    if (!blog || !name || !content) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const comment = await commentModel.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await commentModel
      .find({ blog: blogId, isApproved: true })
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + "Generate a blog content for this topic in simple text format"
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addBlog,
  togglePublish,
  getBlogById,
  deleteBlogById,
  getAllBlogs,
  addComment,
  getComments,
  generateContent,
};
