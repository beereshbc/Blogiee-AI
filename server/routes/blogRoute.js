import express from "express";
import upload from "../middlewares/multer.js";
import Auth from "../middlewares/auth.js";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getComments,
  togglePublish,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), Auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", Auth, deleteBlogById);
blogRouter.post("/toggle-publish", Auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getComments);
blogRouter.post("/generate", Auth, generateContent);

export default blogRouter;
