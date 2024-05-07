import { GameModel } from "../models/Games.js";
import { body, query } from "express-validator";

const getAllGames = async (req, res) => {
    try {
        const games = await GameModel.find();
        res.json(games);

    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).json({ error: "Failed to retrieve games" });
    }
};
const AddGame = async (req, res) => {
    const {  key, name, imgUrl } = req.body;
    try {
        const newGame = new GameModel({
                key: key,
                name: name,
                imgUrl: imgUrl
        });
        const result = await newGame.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });

    }
};


const UpdateGame = async (req, res) => {
    const { id, key, name, imgUrl } = req.body;
    const UpdateGame = await GameModel.updateOne(
        { _id: id },
        {
            key: key,
            name: name,
            imgUrl: imgUrl
        }

    )
    if (UpdateGame.modifiedCount != 0) {
        res.send("true");
    }
    else {
        res.send("false")
    }
};



const DeleteGame = async (req, res) => {
    const { id } = req.query;
    try {
        const Delete = await GameModel.deleteOne({ _id: id });
        console.log(Delete);
        if (Delete.deletedCount != 0) {
            return res.status(200).send("true");
        }
        else {
            return res.status(404).send("user not found");
        }

    }
    catch (e) {
        return res.status(500).send("System error Deleting", e);
    }

}

export { getAllGames, AddGame, UpdateGame, DeleteGame };
