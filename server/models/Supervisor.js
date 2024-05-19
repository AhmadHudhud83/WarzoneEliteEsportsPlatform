import mongoose , {Schema} from "mongoose";

const SupervaisorSchema = new Schema({
    name:{type:String , unique:true , index:true},
    email:String,
    password:String
});
 export const Supervaisor = mongoose.model("Supervisor" , SupervaisorSchema);