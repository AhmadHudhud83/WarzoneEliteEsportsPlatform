import express from "express"; //by ahmad hudhud

const tournamentRouter = express.Router();
import upload from "../middlewares/uploadImage.js";
import {
  createTournament,
  updateTournament,
} from "../controllers/tournamentCotroller.js";
import { getTournamentById } from "../controllers/tournamentCotroller.js";
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
 * @desc update a tournament
 * @route /api/tournaments/:id
 * @method PUT
 * @access private
 *
 */

tournamentRouter.put("/api/tournaments/:id",upload.single('cover_image_url'), updateTournament);

export { tournamentRouter };
