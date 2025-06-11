import express from "express";
import {
  approveCommentById,
  deletCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  login,
} from "../controllers/adminController.js";
import Auth from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", login);
adminRouter.get("/blog", Auth, getAllBlogsAdmin);
adminRouter.get("/comments", Auth, getAllComments);
adminRouter.post("/delete-comment", Auth, deletCommentById);
adminRouter.post("/approve-comment", Auth, approveCommentById);
adminRouter.get("/dashboard", Auth, getDashboard);

export default adminRouter;
