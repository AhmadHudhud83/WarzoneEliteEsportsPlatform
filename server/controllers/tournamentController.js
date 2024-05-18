import {
  TournamentModel,
  tournamentValidation,
} from "../models/Tournaments.js";
import Joi from "joi"; //for a better valdiation
import fs from "fs";
import axios from "axios";
/**
 * @desc Create a new tournament
 * @route /api/tournaments
 * @method POST
 * @access private
 *
 */
export const createTournament = async (req, res) => {
  //get games from mongoDB request
  const getCoverImageUrl = async (gameName) => {
    let defaultImage = "https://i.imgur.com/KHneQTJ.png";
    try {
      const respones = await axios.get("http://localhost:5000/api/Games");
      const games = respones.data;
      const game = games.find((g) => g.name === gameName);
      if (game) {
        return game.imgUrl;
      }
      // console.log("gameResponse DATA is : ", response.data);
    } catch (err) {
      console.error("ERROR", err);
    }
    return defaultImage;
  };

  console.log("body: ", req.body);
  console.log("file: ", req.file);
  console.log("cover image url  : ", req.body.cover_image_url);
  // if (!req.file) {
  //   return res.status(400).json({ message: 'No file uploaded' });
  // }

  let parsedSponsors;
  try {
    parsedSponsors =
      typeof req.body.sponsors === "string"
        ? JSON.parse(req.body.sponsors)
        : req.body.sponsors;
    console.log("sponsors:  ", parsedSponsors);
  } catch (err) {
    console.error("parsing error", error);
    return res.status(400).json({ message: "Invalid sponsors format" });
  }

  console.log(
    "type of sponsors attribute from client is : ",
    typeof parsedSponsors
  );
  //==================JOI VALIDATION (EXPRESS LEVEL VALIDAITON)=====================
  //parse the sponsors array of objects
  req.body.sponsors = parsedSponsors;
  //setting the cover_image_url

  req.body.cover_image_url = await getCoverImageUrl(req.body.game);
  const { error } = tournamentValidation(req.body, "POST");
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const tournament = new TournamentModel({
      game: req.body.game,
      title: req.body.title,
      contact_details: req.body.contact_details,
      start_date: req.body.start_date,
      start_time: req.body.start_time,
      max_participants: req.body.max_participants,
      about: req.body.about,
      rules: req.body.rules,
      prize: req.body.prize,
      schedule: req.body.schedule,
      format: req.body.format,
      description: req.body.description,
      tournament_status: req.body.tournament_status,
      registeration_status: req.body.registeration_status,
      cover_image_url: req.file ? req.file.path : req.body.cover_image_url, //uploading an image is optional,if not uploaded then it takes the default cover value based on the seletcted game
      announcements: req.body.announcements,
      sponsors: req.body.sponsors,
      supervisors: req.body.supervisors,
      //image:req.file.filename
    });
    const result = await tournament.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//========================================================================
/**
 * @desc get all tournaments
 * @route /api/tournaments
 * @method GET
 * @access public
 *
 */
export const getAllTournaments = async (req, res) => {
  const { page, pageSize } = req.query;
  const totalTournaments = await TournamentModel.countDocuments();
  try {
    const tournaments = await TournamentModel.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.json({ tournaments, totalTournaments });
  } catch (error) {
    console.error("Error fetching Tournaments:", error);
    res.status(500).json({ error: "Failed to retrieve tournaments" });
  }
};

/**
 * @desc get a tournament by id for the user
 * @route /api/tournaments/:id
 * @method GET
 * @access public
 *
 */

export const getTournamentById = async (req, res) => {
  try {
    const tournament = await TournamentModel.findById(req.params.id);
    if (tournament) {
      res.status(200).json(tournament);
    } else {
      res.status(404).json({ message: "error :tournament not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
/**
 * @desc update a tournament
 * @route /api/tournaments/:id
 * @method PUT
 * @access private
 *
 */
export const updateTournament = async (req, res) => {
  //  const newReqBody = emptyDataValidation(req.body);
  console.log("type of req.body.sponsors : ", typeof req.body.sponsors);
  let parsedSponsors;
  try {
    parsedSponsors =
      typeof req.body.sponsors === "string"
        ? JSON.parse(req.body.sponsors)
        : req.body.sponsors;
  } catch (err) {
    return res.status(400).json({ message: "Invalid sponsors format" });
  }

  delete req.body._id;
  delete req.body.createdAt;
  delete req.body.updatedAt;
  delete req.body.__v;
  console.log(req.file);

  req.body.sponsors = parsedSponsors;

  const { error } = tournamentValidation(req.body, "PUT");
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  //find the old tournament data to remove the old image cover if a newer cover has been uploaded (with file system package)

  if (req.file) {
    // when any file (image) uploaded , then delete the old image cover
    deleteTournamentCoverImage(req);
  }

  //================================================================
  try {
    const tournament = await TournamentModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          game: req.body.game,
          title: req.body.title,
          contact_details: req.body.contact_details,
          start_date: req.body.start_date,
          start_time: req.body.start_time,
          max_participants: req.body.max_participants,
          about: req.body.about,
          rules: req.body.rules,
          prize: req.body.prize,
          schedule: req.body.schedule,
          format: req.body.format,
          description: req.body.description,
          tournament_status: req.body.tournament_status,
          registeration_status: req.body.registeration_status,
          cover_image_url: req.file ? req.file.path : req.body.cover_image_url,
          announcements: req.body.announcements,
          sponsors: req.body.sponsors,
          supervisors: req.body.supervisors,
        },
      },
      { new: true }
    );
    console.log(req.body.cover_image_url);
    res.status(200).json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
/**
 * @desc Delete a tournament
 * @route /api/tournaments/:id
 * @method DELETE
 * @access private
 *
 */
export const deleteTournament = async (req, res) => {
  deleteTournamentCoverImage(req, res);
  try {
    const tournament = await TournamentModel.findById(req.params.id);
    if (tournament) {
      await TournamentModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Tournament have been deleted" });
    } else {
      res.status(404).json({ message: "Tournament not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
//========================================delete image cover url of tournament function===========================================================
const deleteTournamentCoverImage = async (req, res) => {
  try {
    const oldTournament = await TournamentModel.findById(req.params.id);
    if (!oldTournament) {
      res.status(404).json({ message: "old tournament not found" });
    } else if (oldTournament.cover_image_url.includes("public\\images\\")) {//if its uploaded one then delete, if its a default one ,then don't do anything
      fs.unlinkSync(oldTournament.cover_image_url);
    } else {
      return;
    }
  } catch (err) {
    console.log("old tournament error", err);
    res
      .status(500)
      .json({ message: "something went wrong with deleting cover image" });
  }
};
