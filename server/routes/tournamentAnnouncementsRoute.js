import {
  getTournamentAnnouncements,
  postAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} from "../controllers/tournamentAnnouncementsController.js";
import express from "express";
const tournamentAnnouncementsRouter = express.Router();
/**
 * @desc get all each tournament announcements
 * @route /api/tournaments/:tournamentId
 * @method GET
 * @access private
 *
 */
tournamentAnnouncementsRouter.get(
  "/:tournamentId/announcements",
  getTournamentAnnouncements
);

/**
 * @desc update a tournament specific announcment
 * @route /api/tournaments/announcements/announcementId
 * @method PATCH
 * @access private
 *
 */
tournamentAnnouncementsRouter.patch(
  "/announcements/:announcementId",
  updateAnnouncement
);

/**
 * @desc Add a new announcement to a tournament
 * @route /api/tournaments/announcements/:tournamentId
 * @method PATCH
 * @access private
 *
 */

tournamentAnnouncementsRouter.patch(
  "/:tournamentId/announcements",
  postAnnouncement
);

/**
 * @desc Delete an  announcement in a tournament
 * @route /api/tournaments/announcements/:announcementId
 * @method DELETE
 * @access private
 *
 */
tournamentAnnouncementsRouter.delete( "/announcements/:announcementId",deleteAnnouncement)




export { tournamentAnnouncementsRouter };
