import mongoose , {Schema} from "mongoose";

const organizerSchema = new Schema({
    name:String,
    email:String,
    password:String
});
 export const Organizer = mongoose.model("Organaizer" , organizerSchema);