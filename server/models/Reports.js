

import mongoose from "mongoose";
import { Schema } from "mongoose";
import Joi from 'joi';
const ReportsSchema = new mongoose.Schema({

    report_type:{
        type:String,
        
        


    },
    report_content: {
        type:String,
        
    },
    reporter_name:{
        type:String,
       
        

    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000
    },
    status: {
        type: String,
        required: true,
        enum: ['open', 'closed', 'in-progress']
    } ,
    tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'tournaments', required: true }


});
export const reportSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    status: Joi.string().valid('open', 'closed', 'in-progress').required(),
    
});
export const ReportsModel=mongoose.model("reports", ReportsSchema);