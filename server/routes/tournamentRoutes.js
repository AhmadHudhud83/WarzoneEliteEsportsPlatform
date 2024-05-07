import express from "express"; //by ahmad hudhud
const tournamentRouter = express.Router();


import { createTournament } from "../controllers/tournamentCotroller.js";
/**
 * @desc Create a new tournament
 * @route /api/tournaments
 * @method POST
 * @access public
 *
 */

tournamentRouter.post("/tournaments",createTournament );


export { tournamentRouter };
