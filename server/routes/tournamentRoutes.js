
import express from "express";
import upload from "../middlewares/uploadImage.js";
import {
  initializeMatches,
  setWinner,
  getTournaments,
  setUpRound,
  createTournament,
  updateTournament,
  getTournamentById,
  resetTournament,
  getAllTournamentsPaginated,
  deleteTournament,
  addPlayer,
  removePlayer,
  getAllTournamentsPaginatedByGame,
  getTournamentsOfUser
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

// Set the winner of a match
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

// Reset the tournament
tournamentRouter.patch("/:tournamentId/reset", async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    await resetTournament(tournamentId);
    res.json("Tournament reset successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});


// Get the tournaments
tournamentRouter.get("/allTournaments", async (req, res) => {
  try {
    const tournaments = await getTournaments();
    res.json(tournaments);
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

// Add a player to a tournament
tournamentRouter.post("/:tournamentId/participation", async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { player } = req.body;
    await addPlayer(tournamentId, player);
    res.json("Player added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Remove a player from a tournament
tournamentRouter.delete("/:tournamentId/participation/:playerId", async (req, res) => {
  try {
    const { tournamentId, playerId } = req.params;
    await removePlayer(tournamentId, playerId);
    res.json("Player removed successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

/**
 * @desc get all tournaments (with pagination)
 * @route /api/tournaments
 * @method GET
 * @access public
 *
 */
tournamentRouter.get("/paginated", getAllTournamentsPaginated)//with pagination


/**
 * @desc get all tournaments paginated by game name
 * @route /api/tournaments
 * @method GET
 * @access public
 *
 */

tournamentRouter.get('/paginated-by-game', getAllTournamentsPaginatedByGame);

/**
 * @desc Create a new tournament
 * @route /api/tournaments
 * @method POST
 * @access private
 *
 */

tournamentRouter.use(express.static('public'))
tournamentRouter.post("/", upload.single('cover_image_url'), createTournament)

/**
 * @desc get a tournament by id for the user
 * @route /api/tournaments/:id
 * @method GET
 * @access public
 *
 */
tournamentRouter.get("/:id", getTournamentById);
/**
 * @desc update a tournament
 * @route /api/tournaments/:id
 * @method PUT
 * @access private
 *
 */

tournamentRouter.put("/:id", upload.single('cover_image_url'), updateTournament);
/**
 * @desc Delete a tournament
 * @route /api/tournaments/:id
 * @method DELETE
 * @access private
 *
 */
tournamentRouter.delete("/:id", deleteTournament)


/**
 * @desc get all  tournaments  based on the user Id
 * @route /api/tournaments/:userId
 * @method GET
 * @access public
 *
 */
tournamentRouter.get("/:userId", getTournamentsOfUser)

export { tournamentRouter };


