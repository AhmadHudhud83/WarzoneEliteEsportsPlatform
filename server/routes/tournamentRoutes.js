const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournamentController");

// Initialize a tournament
router.patch("/:id/initialize-matches", async (req, res) => {
  try {
    const tournamentId = req.params.id;
    const matches = await tournamentController.initializeMatches(tournamentId);
    res.json("Matches initialized successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// set the winner of a match
router.patch(
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

module.exports = router;
