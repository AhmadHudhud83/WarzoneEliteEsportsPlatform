import  express  from "express";

import { getAllGames } from "../controllers/gamesController.js";
const routerGame = express.Router();

routerGame.get("/create-tournament", (req, res) => {
    getAllGames(req, res)
});



export {routerGame};