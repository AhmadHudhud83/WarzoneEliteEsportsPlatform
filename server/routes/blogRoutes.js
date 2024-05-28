import express from 'express';
import { getAllBlogs, getBlogById, deleteBlog, createBlog } from '../controllers/blogController.js';
import path from 'path';

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

// New route to serve images by blog post ID
blogRouter.get('/api/blogs/images/:id', (req, res) => {
    const imageId = req.params.id;
    const imagePath = path.join(__dirname, '..', 'images', `${imageId}.jpg`); // Adjust the path and extension as needed
    res.sendFile(imagePath);
});

export { blogRouter };
