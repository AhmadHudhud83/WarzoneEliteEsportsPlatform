

import mongoose from "mongoose";
import { Schema } from "mongoose";

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
export const ReportsModel=mongoose.model("reports", ReportsSchema);