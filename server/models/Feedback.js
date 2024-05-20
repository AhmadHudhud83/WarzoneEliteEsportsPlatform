import mongoose from "mongoose";
import Joi from 'joi';

const FeedbackSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    feedback_content: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});
export const feedbackSchema = Joi.object({
    user_name: Joi.string().min(3).max(100).required(),
    feedback_content: Joi.string().min(10).max(1000).required(),
    rating: Joi.number().min(1).max(5).required(),
    date: Joi.date().optional(),
    userId:Joi.string().required()
    
});

export const FeedbackModel = mongoose.model("feedback", FeedbackSchema);
