import {
  TournamentModel,
  announcementsValidation,
} from "../models/Tournament.js";
/**
 * @desc get all each tournament announcements
 * @route /api/tournaments/announcements/:tournamentId
 * @method GET
 * @access private
 *
 */
export const getTournamentAnnouncements = async (req, res) => {
  try {
    const tournament = await TournamentModel.findById(
      req.params.tournamentId
    ).select("announcements createdAt -_id");
    if (tournament) {
      res.status(200).json(tournament);
    } else {
      res.status(404).json({ message: "error :tournament not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Something went wrong  ` });
  }
};

/**
 * @desc Add a new announcement to a tournament
 * @route /api/tournaments/announcements/:tournamentId
 * @method PATCH
 * @access private
 *
 */

export const postAnnouncement = async (req, res) => {
  const { error } = announcementsValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const tournament = await TournamentModel.findByIdAndUpdate(
      req.params.tournamentId,
      {
        $push: {
          announcements: req.body,
        },
      },
      { new: true }
    );
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `something went wrong posting announcement` });
  }
};
/**
 * @desc update a tournament specific announcment
 * @route /api/tournaments/announcements/announcementId
 * @method PATCH
 * @access private
 *
 */

//source : https://www.youtube.com/watch?v=aA_y3ewrnpI
export const updateAnnouncement = async (req, res) => {
  const { error } = announcementsValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { announcementId } = req.params;
    // console.log(tournamentId,announcementId)
    //console.log("THE PROVIDED ANNOUNCMENT IS  : ",announcement)
    req.body._id = announcementId;

    const tournament = await TournamentModel.findOneAndUpdate(
      { "announcements._id": announcementId },
      {
        $set: {
          "announcements.$": req.body,
        },
      },
      { new: true }
    );

    if (!tournament) {
      return res
        .status(404)
        .json({ message: "Tournament or announcement not found" });
    }

    res.status(200).json(tournament);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong updating the announcement" });
  }
};

/**
 * @desc Delete an  announcement in a tournament
 * @route /api/tournaments/announcements/:announcementId
 * @method DELETE
 * @access private
 *
 */
//source :https://stackoverflow.com/questions/75296990/how-to-delete-an-object-in-nested-array-of-objects-in-mongodb-with-node-js
export const deleteAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const tournament = await TournamentModel.findOneAndUpdate(
      { "announcements._id": announcementId },
      {
        $pull: {
          announcements: {
            _id: announcementId,
          },
        },
      },
      { new: true }
    );

    if (!tournament) {
      return res
        .status(404)
        .json({ message: "Tournament or announcement not found" });
    }

    res.status(200).json({ tournament });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong deleting the announcement" });
  }
};
