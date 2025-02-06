import mongoose  from "mongoose";

const UserSchema =  new mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
    }
})

export const UserModel = mongoose.model("users",UserSchema)
