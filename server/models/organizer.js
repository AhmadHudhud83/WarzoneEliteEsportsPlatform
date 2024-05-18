import mongoose , {Schema} from "mongoose";

const organizerSchema = new Schema({
    name:{type:String , unique:true , index:true},
    email:String,
    password:String
});
 export const Organizer = mongoose.model("Organaizer" , organizerSchema);