const express = require("express");
const tournamentRouter = express.Router();
const tournamentController = require("../controllers/tournamentController");

// Initialize a tournament
tournamentRouter.patch("/:id/initialize-matches", async (req, res) => {
  try {
    const tournamentId = req.params.id;
    const matches = await tournamentController.initializeMatches(tournamentId);
    res.json("Matches initialized successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// set the winner of a match
tournamentRouter.patch(
  "/:tournamentId/matches/:matchId/players/:playerId/set-winner",
  async (req, res) => {
    try {
      const { tournamentId, matchId, playerId } = req.params;
      tournamentController.setWinner(tournamentId, matchId, playerId);
      res.json({ message: "Winner set successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = tournamentRouter;
