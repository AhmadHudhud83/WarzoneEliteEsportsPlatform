import express from "express"; //by ahmad hudhud

const tournamentRouter = express.Router();
import upload from "../middlewares/uploadImage.js";
import {
  createTournament,
  getAllTournaments,
  updateTournament,
  deleteTournament
} from "../controllers/tournamentController.js";
import { getTournamentById } from "../controllers/tournamentController.js";
/**
 * @desc Create a new tournament
 * @route /api/tournaments
 * @method POST
 * @access private
 *
 */

tournamentRouter.use(express.static('public'))
tournamentRouter.post("/api/tournaments",upload.single('cover_image_url'), createTournament)

/**
 * @desc get a tournament by id for the user
 * @route /api/tournaments/:id
 * @method GET
 * @access public
 *
 */
tournamentRouter.get("/api/tournaments/:id", getTournamentById);

/**
 * @desc get all tournaments
 * @route /api/tournaments
 * @method GET
 * @access public
 *
 */ 
tournamentRouter.get("/api/tournaments",getAllTournaments)





/**
 * @desc update a tournament
 * @route /api/tournaments/:id
 * @method PUT
 * @access private
 *
 */

tournamentRouter.put("/api/tournaments/:id",upload.single('cover_image_url'), updateTournament);

/**
 * @desc Delete a tournament
 * @route /api/tournaments/:id
 * @method DELETE
 * @access private
 *
 */
tournamentRouter.delete("/api/tournaments/:id",deleteTournament)

export { tournamentRouter };
