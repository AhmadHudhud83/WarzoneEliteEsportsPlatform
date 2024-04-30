import  express  from "express";

import { getAllGames } from "../controllers/gamesController.js";
const routerGame = express.Game();

routerGame.get("/", (req, res) => {
    getAllGames(req, res)
});



export {routerGame};