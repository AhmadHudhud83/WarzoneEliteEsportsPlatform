import { ReportsModel } from "../models/Reports.js";
import Joi from 'joi';

const reportSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    status: Joi.string().valid('open', 'closed', 'in-progress').required(),
    
});

export const getAllReports = async (req, res) => {
    try {
        const reports = await ReportsModel.find();
        res.json(reports);

    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Failed to retrieve reports" });
    }
}

export const getReportsById = async (req, res) => {
    try {

        const report = await ReportsModel.findById(req.params.reportId)
        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).json({ message: "report not found" })
        }
    } catch {
        (e) => {
            console.error(e)
            res.status(500).json({ message: "Something went wrong" })
        }
    }
}

export const deleteReport = async (req, res) => {
    try {
        const report = await ReportsModel.findById(req.params.reportId)
        if (report) {
            await ReportsModel.findByIdAndDelete(req.params.reportId)
            res.status(200).json({ message: 'Report has been deleted.' })


        } else {
            res.status(404).json({ message: "Report not found" })

        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "something went wrong deleting report" })

    }
}
export const createReport = async (req, res) => {
    try {
        
        const { error, value } = reportSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const newReport = new ReportsModel(value);
        const savedReport = await newReport.save();
        res.status(200).json(savedReport);
    } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ message: "failed to create report" });
    }
}
