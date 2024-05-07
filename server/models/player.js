import mongoose , {Schema} from "mongoose";

const playerSchema = new Schema({
    name:String,
    email:String,
    password:String
});
 export const Player = mongoose.model("Player" , playerSchema);