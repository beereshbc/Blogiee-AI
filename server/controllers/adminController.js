import jwt from "jsonwebtoken";
import commentModel from "../models/commentModel.js";
import BlogModel from "../models/blogModel.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL &&
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(email, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel
      .find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await BlogModel.find({}).sort({
      createdAt: -1,
    });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deletCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await commentModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await commentModel.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment is approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await BlogModel.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(5);
    const blogs = await BlogModel.countDocuments();
    const comments = await commentModel.countDocuments();
    const drafts = await BlogModel.countDocuments({ isApproved: false });

    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  login,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  approveCommentById,
  deletCommentById,
};
