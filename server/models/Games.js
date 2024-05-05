import mongoose , {Schema} from "mongoose";

const GameSchema = new mongoose.Schema({
    key: {
        type: Number,
    },
    name: {
        type: String,
    },
    imgUrl: {
        type: String,
    }
})
export const GameModel = mongoose.model("games", GameSchema);

