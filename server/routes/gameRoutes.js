import express from "express";
import { getAllGames, AddGame, UpdateGame, DeleteGame } from "../controllers/gamesController.js";
const routerGame = express.Router();
import { body, query } from "express-validator";

routerGame.get("/Games", (req, res) => {
    getAllGames(req, res);
});

//create a new game
routerGame.post("/game/add", (req, res) => {
    AddGame(req, res);
});

//update a game
routerGame.put("/game/update", (req, res) => {
    UpdateGame(req, res);
});

//delete a game
routerGame.delete("/game/delete", (req, res) => {
    DeleteGame(req, res);
});



export { routerGame };