import  express  from "express";
import { getGameById } from "../controllers/gamesController.js";
import { getAllGames } from "../controllers/gamesController.js";
const routerGame = express.Router();

routerGame.get("/api/games", (req, res) => {
    getAllGames(req, res)
});

/**
 * @desc get a game by id
 * @route /api/games/:gameId
 * @method POST
 * @access private
 *
 */
routerGame.get("/api/games/:gameId",(req,res)=>[
    getGameById(req,res)
])


export {routerGame};