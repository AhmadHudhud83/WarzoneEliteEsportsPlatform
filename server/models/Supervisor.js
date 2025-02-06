
//=================AREEN'S CODE===========================
// import mongoose , {Schema} from "mongoose";

// const SupervaisorSchema = new Schema({
//     name:{type:String , unique:true , index:true},
//     email:String,
//     password:String
// });
//  export const Supervaisor = mongoose.model("Supervisor" , SupervaisorSchema);

//=================OSAMA'S CODE===============================
import mongoose, { Schema } from "mongoose";

const SupervisorSchema = new Schema({
   
    name: {
        type: String,
        required: true,
        unique:true,
        index:true
    },
    email: {
        type: String,
        required: true,
    },
    password:String
});

export const SupervisorModel = mongoose.model("supervisors", SupervisorSchema);

