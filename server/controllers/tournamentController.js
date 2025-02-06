import { TournamentModel, tournamentValidation } from "../models/Tournament.js";
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
      platform: req.body.platform,
      description: req.body.description,
      tournament_status: req.body.tournament_status,
      registeration_status: req.body.registeration_status,
      cover_image_url: req.file ? req.file.path : req.body.cover_image_url, //uploading an image is optional,if not uploaded then it takes the default cover value based on the seletcted game
      // announcements: [
      //   {
      //     name: "Tournament Organization",
      //     content: `Welcome to ${req.body.title} ! `,
      //   },
      // ],
      participants:req.body.participants,
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
 * @desc get all tournaments paginated
 * @route /api/tournaments
 * @method GET
 * @access public
 *
 */
export const getAllTournamentsPaginated = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const totalTournaments = await TournamentModel.countDocuments();
    const tournaments = await TournamentModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.json({ tournaments, totalTournaments });
  } catch (error) {
    console.error("Error fetching paginated Tournaments:", error);
    res.status(500).json({ error: "Failed to retrieve paginated tournaments" });
  }
};

/**
 * @desc get all  tournaments paginated based in the game name
 * @route /api/tournaments
 * @method GET
 * @access public
 *
 */
export const getAllTournamentsPaginatedByGame = async (req, res) => {
  const { page = 1, gameName } = req.query;

  try {
    const gameNameAttribute = gameName ? { game: gameName } : {};
    const totalTournaments = await TournamentModel.countDocuments(
      gameNameAttribute
    );
    const tournaments = await TournamentModel.find(gameNameAttribute)
      .skip((page - 1) * 6)
      .limit(6);
    res.json({ tournaments, totalTournaments });
  } catch (error) {
    console.error("Error fetching Tournaments paginated by game:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve tournaments paginated by game" });
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
    res.status(500).json({
      message: `Something went wrong fetching tournament with id :${req.params.id} `,
    });
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
  console.log("FORMAT IS ", req.body.format);
  let parsedSponsors;
  try {
    parsedSponsors =
      typeof req.body.sponsors === "string"
        ? JSON.parse(req.body.sponsors)
        : req.body.sponsors;
  } catch (err) {
    return res.status(400).json({ message: "Invalid sponsors format" });
  }

  // delete req.body._id;
  // delete req.body.createdAt;
  // delete req.body.updatedAt;
  // delete req.body.__v;
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
          platform: req.body.platform,
          description: req.body.description,
          tournament_status: req.body.tournament_status,
          registeration_status: req.body.registeration_status,
          cover_image_url: req.file ? req.file.path : req.body.cover_image_url,
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
    } else if (oldTournament.cover_image_url.includes("public\\images\\")) {
      //if its uploaded one then delete, if its a default one ,then don't do anything
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



//=======================================================================================

// Osama's code
// This function structures the matches array by creating the matches array with proper structure
const structureMatches = (
  matches,
  currentRound,
  numberOfParticipants,
  numberOfRounds,
  init
) => {
  let i = currentRound, // traverse through the rounds
    j = Math.floor(numberOfParticipants / 2) + (numberOfParticipants % 2), // number of matches in a round
    p = numberOfParticipants, // number of participants in a round
    numRounds = numberOfRounds;

  do {
    matches[i] = Array(j).fill(null); // create an array of matches for each round
    for (let k = 0; k < j; k++) {
      // initialize each match
      matches[i][k] = {
        team1: null,
        team2: null,
        supervisor: null,
        winner: null,
      };
    }

    i++;
    j = Math.ceil(j / 2);
    p = Math.ceil(p / 2);
    numRounds--;
  } while (numRounds > 0);

  // remove the extra rounds after the   last round
  matches.splice(currentRound + numberOfRounds - init);
};

// This function takes the matches array, which is passed by refrerence and the index of the current round,
// and fills it with given participants and supervisors
const fillMatches = (matches, roundId, participants, supervisors) => {
  const numberOfMatches = Math.ceil(participants.length / 2);

  if (participants.length % 2 !== 0) {
    const byeIndex = Math.floor(Math.random() * numberOfMatches); // randomly select a match to have a bye
    matches[roundId][byeIndex].team2 = "bye"; // add the bye to the match
  }

  var i = 0, // traverse through the matches in a round
    j = 0; // traverse through the participants

  while (i < numberOfMatches) {
    matches[roundId][i].team1 = participants[j]; // add the first participant to the match
    j++;

    if (matches[roundId][i].team2 === null) {
      // to avoid overriding the bye
      matches[roundId][i].team2 = participants[j]; // add the second participant to the match
      j++;
    }

    const supervisorIndex = i % supervisors.length; // to evenly distribute the supervisors
    matches[roundId][i].supervisor = supervisors[supervisorIndex]; // add the supervisor to the match
    i++;
  }
};

// This function initializes the matches for a tournament by creating the matches array with proper structure,
// adding needed byes to arrange proper matches, and filling the first round with participants and supervisors
export const initializeMatches = async (tournamentId) => {
  // Fetch the tournament document
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found", tournamentId);
  }

  // Get the participants and supervisors
  const participants = tournament.participants;

  if (participants.length < 2) {
    throw new Error("Not enough participants to initialize the tournament");
  }
  const supervisors = tournament.supervisors;

  // Create the matches array
  const numberOfParticipants = participants.length;
  const numberOfRounds = Math.ceil(Math.log2(numberOfParticipants));
  structureMatches(
    tournament.matches,
    0,
    numberOfParticipants,
    numberOfRounds,
    0
  );

  // Fill the first round with participants and supervisors
  fillMatches(tournament.matches, 0, participants, supervisors);

  // Update the tournament document
  tournament.currentRound = 0;
  tournament.tournament_status = "Ongoing";
  tournament.registeration_status = "Closed";
  await tournament.save();
};

// This function sets the winner of a match then checks if all matches in the current round have a winner to move to the next round
export const setWinner = async (tournamentId, matchId, player) => {
  // Fetch the tournament document
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found", tournamentId);
  }
  const currentRound = tournament.currentRound;

  tournament.matches[currentRound][matchId].winner = player; // Set the winner of the match

  // Check if all matches in the current round have a winner
  if (isRoundComplete(tournament.matches[currentRound])) {
    setUpRound(tournament); // Set up the next round
  }
  tournament.markModified("matches"); // Mark the matches array as modified
  await tournament.save(); // Save the updated tournament document
};

// This function checks if all matches in a round have a winner
const isRoundComplete = (round) => {
  return round.every((match) => match.winner !== null);
};

// This function sets up the next round by moving the winners of the current round to the next round
const setUpRound = async (tournament) => {
  tournament.currentRound++; // Move to the next round

  const previousRound = tournament.currentRound - 1;
  const currentRound = tournament.currentRound;

  // Get the winners of none empty matches in the previous round to be the participants of the next round but exlude the matches with no winner
  var participants = [];

  tournament.matches[previousRound].forEach((match) => {
    if (match.winner !== null && match.winner !== "none") {
      participants.push(match.winner);
    }
  });

  // Recreate the matches array with the new number of matches
  const numberOfParticipants = participants.length;
  const numberOfRounds = Math.ceil(Math.log2(numberOfParticipants)) + 1;
  structureMatches(
    tournament.matches,
    currentRound,
    numberOfParticipants,
    numberOfRounds,
    1
  );

  if (participants.length === 1) {
    // Set the winner of the tournament
    tournament.winner = participants[0];
    tournament.tournament_status = "Finished";
    return;
  }

  // Get the supervisors
  const supervisors = tournament.supervisors;

  // Fill the matches of the current round with the participants and supervisors
  fillMatches(tournament.matches, currentRound, participants, supervisors);

  return tournament;
};

// Get tournaments
export const getTournaments = async () => {
  const tournaments = await TournamentModel.find();
  return tournaments;
};

// Get the tournaments supervised by a supervisor
export const getTournamentsSupervised = async (supervisorId) => {
  // Fetch tournamnets where the supervisor is part of the supervisors array
  const tournaments = await TournamentModel.find({
    'supervisors._id': supervisorId,
  });
  return tournaments;
};

// Reset the tournament
export const resetTournament = async (tournamentId) => {
  // Fetch the tournament document
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found", tournamentId);
  }

  // Reset the tournament
  tournament.currentRound = -1;
  tournament.winner = null;
  tournament.tournament_status = "Uninitialized";
  tournament.registeration_status = "Opened";
  tournament.matches = [];

  tournament.markModified("matches"); // Mark the matches array as modified
  await tournament.save(); // Save the updated tournament document
};

// Add a player to a tournament
export const addPlayer = async (tournamentId, player) => {
  // Fetch the tournament document
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found", tournamentId);
  }

  if (tournament.registeration_status === "Closed") {
    throw new Error("Registeration is closed for this tournament");
  }

  // Check if the player is already in the tournament
  if (tournament.participants.find((p) => p._id === player._id)) {
    throw new Error("Player is already in the tournament");
  }

  // Check if the tournament is full
  if (tournament.participants.length >= tournament.max_participants) {
    throw new Error("Tournament is full");
  }

  tournament.participants.push(player);

  // Save the updated tournament document
  tournament.markModified("participants"); // Mark the participants array as modified
  await tournament.save();
};

// Remove a player from a tournament
export const removePlayer = async (tournamentId, playerId) => {
  // Fetch the tournament document
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found", tournamentId);
  }

  // Remove the player from the participants array
  tournament.participants = tournament.participants.filter(
    (player) => player._id !== playerId
  );
  console.log(playerId);
  console.log(tournament.participants);

  // Save the updated tournament document
  tournament.markModified("participants"); // Mark the participants array as modified
  await tournament.save();
};

// Get the tournament supervisors
export const getSupervisors = async (tournamentId) => {
  // Fetch the tournament document
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found", tournamentId);
  }

  return tournament.supervisors;
};

// Update the tournament supervisors
export const updateSupervisors = async (tournamentId, supervisors) => {
  // Fetch the tournament document
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found", tournamentId);
  }
  console.log(supervisors);
  tournament.supervisors = supervisors;

  // Save the updated tournament document
  tournament.markModified("supervisors"); // Mark the supervisors array as modified
  await tournament.save();
};


