import { GameModel } from "../models/Games.js";



export const getAllGames = async (req, res) => {
    try {
        const games = await GameModel.find();
        res.json(games);
        
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).json({ error: "Failed to retrieve games" });
    }
}

/**
 * @desc get a game by name
 * @route /api/games/:gameName
 * @method POST
 * @access private
 *
 */

export const getGameById = async(req,res)=>{
    try{
  
        const game =await GameModel.findOne({name:req.params.gameName })
        if(game){
            res.status(200).json(game);
        }else{
            res.status(404).json({message:"game not found"})
        }
    }catch{(e)=>{
        console.error(e)
        res.status(500).json({message:"Something went wrong"})
    }}
}