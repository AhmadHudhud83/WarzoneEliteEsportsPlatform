import mongoose from "mongoose";

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

export const FeedbackModel = mongoose.model("feedback", FeedbackSchema);
