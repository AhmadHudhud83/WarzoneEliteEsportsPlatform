import mongoose, { Schema } from "mongoose";

const SupervisorSchema = new Schema({
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

const SupervisorModel = mongoose.model("supervisors", SupervisorSchema);