

import mongoose from "mongoose";
import { Schema } from "mongoose";

const ReportsSchema = new mongoose.Schema({

    report_type:{
        required:true,
        type:String,


    },
    report_content: {
        type:String,
        
    },
    reporter_name:{
        required:true,
        type:String,

    }

});
export const ReportsModel=mongoose.model("reports", ReportsSchema);