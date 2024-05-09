import TournamentModel from "../models/Tournament.js";

// This function structures the matches array by creating the matches array with proper structure
const structureMatches = (matches, currentRound, numberOfParticipants, numberOfRounds, init) => {
  console.log(numberOfParticipants);

  let i = currentRound,
    j = Math.ceil(numberOfParticipants / 2), // number of matches in a round
    p = numberOfParticipants; // number of participants in a round

  while (i < numberOfRounds) {
    console.log("round", i, "matches", j, "participants", p, "number of rounds", numberOfRounds);
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
  }

  // remove the extra rounds after the last round
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
  const supervisors = tournament.supervisors;

  // Create the matches array
  const numberOfParticipants = participants.length;
  const numberOfRounds = Math.ceil(Math.log2(numberOfParticipants));
  structureMatches(tournament.matches, 0, numberOfParticipants, numberOfRounds, 0);

  // Fill the first round with participants and supervisors
  fillMatches(tournament.matches, 0, participants, supervisors);



  // Update the tournament document
  tournament.currentRound = 0;
  tournament.status = "in progress";
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
export const setUpRound = async (tournament) => {
  tournament.currentRound++; // Move to the next round

  const previousRound = tournament.currentRound - 1;
  const currentRound = tournament.currentRound;

  // Get the winners of none empty matches in the previous round to be the participants of the next round but exlude the matches with no winner
  var participants = [];

  tournament.matches[previousRound].forEach(match => {
    if (match.winner !== null && match.winner !== "none") {
      participants.push(match.winner)
    }
  });

  // Recreate the matches array with the new number of matches
  const numberOfParticipants = participants.length;
  const numberOfRounds = Math.ceil(Math.log2(numberOfParticipants)) + 1;
  structureMatches(tournament.matches, currentRound, numberOfParticipants, numberOfRounds, 1);

  if (participants.length === 1) {
    // Set the winner of the tournament
    tournament.winner = participants[0];
    return;
  }

  // Get the supervisors
  const supervisors = tournament.supervisors;

  // Fill the matches of the current round with the participants and supervisors
  fillMatches(
    tournament.matches,
    currentRound,
    participants,
    supervisors
  );

  return tournament;
};

// Get tournaments
export const getTournaments = async () => {
  const tournaments = await TournamentModel.find();
  return tournaments;
};

// Add a new tournament
export const addTournament = async (tournament) => {
  const newTournament = new TournamentModel(tournament);
  await newTournament.save();
  return newTournament;
};

// Get a tournament by id
export const getTournament = async (tournamentId) => {
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) {
    throw new Error("Tournament not found", tournamentId);
  }
  return tournament;
};