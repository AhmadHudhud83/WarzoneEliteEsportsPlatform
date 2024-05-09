import mongoose from "mongoose";

const TournamentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
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
  image: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  winner: {
    type: Object,
    required: false,
  },
});

const TournamentModel = mongoose.model("tournaments", TournamentSchema);

export default TournamentModel;
