import express from "express"; //by ahmad hudhud
const tournamentRouter = express.Router();


import { createTournament } from "../controllers/tournamentCotroller.js";
import { getTournamentById } from "../controllers/tournamentCotroller.js";
/**
 * @desc Create a new tournament
 * @route /api/tournaments
 * @method POST
 * @access private
 *
 */

tournamentRouter.post("/api/tournaments",createTournament );

/**
 * @desc get a tournament by id for the user
 * @route /api/tournaments
 * @method GET
 * @access public
 *
 */
tournamentRouter.get('/api/tournaments/:id',getTournamentById)

export { tournamentRouter };
