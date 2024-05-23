import { BlogModel } from "../models/Blog.js";
import Joi from 'joi';
const commentSchema = Joi.object({
    user: Joi.string().min(3).max(100).required(),
    message: Joi.string().min(1).max(500).required(),
    posted_at: Joi.date().optional()
});

const blogSchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().min(3).max(100).required(),
    tags: Joi.array().items(Joi.string().min(1).max(50)).optional(),
    category: Joi.string().required(),
    featured_image: Joi.string().uri().optional(),
    comments: Joi.array().items(
        Joi.object({
            user: Joi.string().required(),
            message: Joi.string().required(),
            posted_at: Joi.date().optional()
        })
    ).optional(),
    likes: Joi.number().optional(),
    views: Joi.number().optional(),
    published_date: Joi.date().optional()
});

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

export const getAllBlogs = async (req, res) => {
    const { page, size, title, tags, category } = req.query;
    let condition = {};
    
    if (title) {
        condition.title = { $regex: new RegExp(title), $options: "i" };
    }
    if (tags) {
        condition.tags = { $in: tags.split(',') };
    }
    if (category) {
        condition.category = category;
    }
    
    const { limit, offset } = getPagination(page, size);

    try {
        const blogs = await BlogModel.find(condition).skip(offset).limit(limit).sort({ published_date: -1 });
        const totalItems = await BlogModel.countDocuments(condition);
        res.json({
            totalItems,
            blogs,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page ? +page : 1,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Failed to retrieve blogs" });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.blogId);
        if (blog) {
            blog.views += 1;
            await blog.save();
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.blogId);
        if (blog) {
            await BlogModel.findByIdAndDelete(req.params.blogId);
            res.status(200).json({ message: 'Blog has been deleted.' });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Something went wrong deleting blog" });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { error, value } = blogSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newBlog = new BlogModel(value);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Failed to create blog" });
    }
};
