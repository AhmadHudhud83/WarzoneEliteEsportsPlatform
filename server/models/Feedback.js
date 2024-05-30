import mongoose from "mongoose";
import Joi from 'joi';

const FeedbackSchema = new mongoose.Schema({
   
    feedback_content: {
        type: String,
        required: true,
       
    },
    position:{
        type: String,
        required: true,
        
    },

    date: {
        type: Date,
        default: Date.now
    },
    


});
export const feedbackSchema = Joi.object({
    feedback_content: Joi.string().required(),
    position: Joi.string().required(),
    date: Joi.date().optional(),
 
    
});

export const FeedbackModel = mongoose.model("feedbacks", FeedbackSchema);
