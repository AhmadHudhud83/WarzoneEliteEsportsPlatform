import express from 'express';
import { getAllFeedback, getFeedbackById, deleteFeedback, createFeedback } from '../controllers/feedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.get('/', (req, res) => {
    getAllFeedback(req, res);
});

feedbackRouter.get("/:feedbackId", (req, res) => {
    getFeedbackById(req, res);
});

feedbackRouter.delete("/:feedbackId", (req, res) => {
    deleteFeedback(req, res);
});

feedbackRouter.post("/", (req, res) => {
    console.log("hello");
    createFeedback(req, res);
});

export { feedbackRouter };
