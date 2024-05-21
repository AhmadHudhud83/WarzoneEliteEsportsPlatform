import { GameModel } from "../models/Games.js";

/**
 * @desc get a game by name
 * @route /api/games/:gameName
 * @method POST
 * @access private
 *
 */

 const getGameById = async (req, res) => {
  try {
    const game = await GameModel.findOne({ name: req.params.gameName });
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: "game not found" });
    }
  } catch {
    (e) => {
      console.error(e);
      res.status(500).json({ message: "Something went wrong" });
    };
  }
};

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
  const { key, name, imgUrl } = req.body;
  try {
    const newGame = new GameModel({
      key: key,
      name: name,
      imgUrl: imgUrl,
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
      imgUrl: imgUrl,
    }
  );
  if (UpdateGame.modifiedCount != 0) {
    res.send("true");
  } else {
    res.send("false");
  }
};

const DeleteGame = async (req, res) => {
  const { id } = req.query;
  try {
    const Delete = await GameModel.deleteOne({ _id: id });
    console.log(Delete);
    if (Delete.deletedCount != 0) {
      return res.status(200).send("true");
    } else {
      return res.status(404).send("user not found");
    }
  } catch (e) {
    return res.status(500).send("System error Deleting", e);
  }
};
const getGamesByName = async (req, res) => {
    try {
      const games = await GameModel.find().select('name -_id');
      const gameNames = games.map(game => game.name);
      res.json(gameNames);
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).json({ error: "Failed to retrieve games" });
    }
  };
export { getAllGames, AddGame, UpdateGame, DeleteGame, getGameById,getGamesByName};
