import express from "express";
import { getAllBlog,getBlogById,createBlog,updatedBlog,deletedBlog } from "../controllers/blogController.js";
import {validateToken} from "../middleware/authMiddleware.js";
const blogRouter = express.Router();

blogRouter.post("/createBlog",validateToken,createBlog);
blogRouter.post("/allBlogs",getAllBlog);
blogRouter.get("Blog/:id",getBlogById,validateToken);
blogRouter.put(".updateBlog/:id",updatedBlog,validateToken);
blogRouter.delete("/deleteBlog/:id",deletedBlog,validateToken);

export default blogRouter;