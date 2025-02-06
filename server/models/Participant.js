import mongoose, { Schema } from "mongoose";

const ParticipantSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const ParticipantModel = mongoose.model("participants", ParticipantSchema);