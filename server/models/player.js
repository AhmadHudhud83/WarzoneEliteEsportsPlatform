import mongoose , {Schema} from "mongoose";

const playerSchema = new Schema({
    name:{type:String , unique:true , index:true},
    email:String,
    password:String
});
 export const Player = mongoose.model("Player" , playerSchema);