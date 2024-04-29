const express = require("express");
const router = express.Router();
const { getAllGames } = require("../Controller/gamesController");

router.get("/", (req, res) => {
    getAllGames(req, res)
});



module.exports = router;