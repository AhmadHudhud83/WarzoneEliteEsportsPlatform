import { FeedbackModel , feedbackSchema } from "../models/Feedback.js";

import Joi from 'joi';




export const getAllFeedback = async (req, res) => {
    try {
        const feedback = await FeedbackModel.find();
        res.json(feedback);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Failed to retrieve feedback" });
    }
};

export const getFeedbackById = async (req, res) => {
    try {
        const feedback = await FeedbackModel.findById(req.params.feedbackId);
        if (feedback) {
            res.status(200).json(feedback);
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (error) {
        console.error("Error fetching feedback by ID:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteFeedback = async (req, res) => {
    try {
        const feedback = await FeedbackModel.findById(req.params.feedbackId);
        if (feedback) {
            await FeedbackModel.findByIdAndDelete(req.params.feedbackId);
            res.status(200).json({ message: 'Feedback has been deleted.' });
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({ message: "Something went wrong deleting feedback" });
    }
};

export const createFeedback = async (req, res) => {
    try {
        
        const { error, value } = feedbackSchema.validate(req.body);
        console.log(error);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        
        const newFeedback = new FeedbackModel(value);
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({ message: "Failed to create feedback" });
    }
};
