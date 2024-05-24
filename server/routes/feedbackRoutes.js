import express from 'express';
import { getAllFeedback, getFeedbackById, deleteFeedback, createFeedback } from '../controllers/feedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.get('/api/feedback', (req, res) => {
    getAllFeedback(req, res);
});

feedbackRouter.get("/api/feedback/:feedbackId", (req, res) => {
    getFeedbackById(req, res);
});

feedbackRouter.delete("/api/feedback/:feedbackId", (req, res) => {
    deleteFeedback(req, res);
});

feedbackRouter.post("/api/feedback", (req, res) => {
    createFeedback(req, res);
});

export { feedbackRouter };
