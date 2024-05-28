import express from 'express';
import { getAllBlogs, getBlogById, deleteBlog, createBlog } from '../controllers/blogController.js';

const blogRouter = express.Router();

blogRouter.get('/api/blogs', (req, res) => {
    getAllBlogs(req, res);
});

blogRouter.get("/api/blogs/:blogId", (req, res) => {
    getBlogById(req, res);
});

blogRouter.delete("/api/blogs/:blogId", (req, res) => {
    deleteBlog(req, res);
});

blogRouter.post("/api/blogs", (req, res) => {
    createBlog(req, res);
});

export { blogRouter };
