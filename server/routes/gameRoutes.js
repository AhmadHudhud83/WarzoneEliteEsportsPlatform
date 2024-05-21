import  express  from "express";
import { getGameById,getAllGames,DeleteGame,UpdateGame,AddGame,getGamesByName } from "../controllers/gamesController.js";

const routerGame = express.Router();

routerGame.get("/api/games", (req, res) => {
    getAllGames(req, res)
});


//get list of game names only 
routerGame.get("/api/games/names",(req,res)=>{
    getGamesByName(req,res)
})

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


/**
 * @desc get a game by name
 * @route /api/games/:gameName
 * @method POST
 * @access private
 *
 */
routerGame.get("/api/games/:gameName",(req,res)=>[
    getGameById(req,res)
])


export {routerGame};