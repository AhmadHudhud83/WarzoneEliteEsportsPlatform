import express from "express";
import {
  initializeMatches,
  setWinner,
  getTournaments,
  addTournament,
  getTournament,
  setUpRound,
} from "../controllers/tournamentController.js";

const tournamentRouter = express.Router();

// Initialize a tournament
tournamentRouter.patch(
  "/:tournamentId/initialize-matches",
  async (req, res) => {
    try {
      const tournamentId = req.params.tournamentId;
      await initializeMatches(tournamentId);
      res.json("Matches initialized successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

// set the winner of a match
tournamentRouter.patch(
  "/:tournamentId/matches/:matchId/set-winner",
  async (req, res) => {
    try {
      const { tournamentId, matchId } = req.params;
      const player = req.body.player;
      setWinner(tournamentId, matchId, player);
      res.json({ message: "Winner set successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

// Get the tournaments
tournamentRouter.get("/", async (req, res) => {
  try {
    const tournaments = await getTournaments();
    res.json(tournaments);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Get a tournament by id
tournamentRouter.get("/:tournamentId", async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const tournament = await getTournament(tournamentId);
    res.json(tournament);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Add a new tournament
tournamentRouter.post("/", async (req, res) => {
  try {
    addTournament(req.body);
    res.json({ message: "Tournament added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Setup the next round
tournamentRouter.patch("/:tournamentId/setup-round", async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    await setUpRound(tournamentId);
    res.json("Round set up successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

export { tournamentRouter };
