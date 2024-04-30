import { GameModel } from "../models/Games.js";



export const getAllGames = async (req, res) => {
    try {
        const games = await GameModel.find();
        res.json(games);
        
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).json({ error: "Failed to retrieve games" });
    }
};

