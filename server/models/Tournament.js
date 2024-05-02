const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  supervisors: {
    type: Array,
    required: true,
  },
  participants: {
    type: Array,
    required: false,
  },
  matches: {
    type: Array,
    required: false,
  },
  currentRound: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  registrationEndDate: {
    type: Date,
    required: true,
  },
});

const TournamentModel = mongoose.model("Tournament", TournamentSchema);

module.exports = TournamentModel;
