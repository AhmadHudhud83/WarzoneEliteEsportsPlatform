//function doLogic() {
// do logic
//}

//module.exports = doLogic;

const Game = require("../models/Games");

const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
        
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).json({ error: "Failed to retrieve games" });
    }
};

module.exports = { getAllGames }