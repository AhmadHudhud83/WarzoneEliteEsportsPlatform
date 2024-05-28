import mongoose from "mongoose";
import { Schema } from "mongoose";

const CommentSchema = new Schema({
    user: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    message: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    posted_at: {
        type: Date,
        default: Date.now
    }
});

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
   
    content: {
        type: String,
        required: true,
        minlength: 10
    },
    author: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true
    },
    comments: [CommentSchema],
    likes: {
        type: Number,
        default: 0
    },
    published_date: {
        type: Date,
        default: Date.now
    },
    
    views: {
        type: Number,
        default: 0
    }
});



export const BlogModel = mongoose.model("Blog", BlogSchema);
