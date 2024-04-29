const mongoose = require("mongoose")

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
const GameModel = mongoose.model("games", GameSchema);
module.exports = GameModel;