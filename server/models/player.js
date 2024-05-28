import mongoose, { Schema } from "mongoose";

const playerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, unique: true, index: true },
    email: String,
    password: String
});
export const Player = mongoose.model("players", playerSchema);