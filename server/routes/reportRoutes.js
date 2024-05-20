import express from 'express';

import { getReportsById, getAllReports, deleteReport, createReport } from '../controllers/reportsController.js';
const reportsRouter = express.Router();

reportsRouter.get('/api/reports', (req, res) => {

    getAllReports(req, res);


})

reportsRouter.get("/api/reports/:reportId", (req, res) => {

    getReportsById(req, res);


})

reportsRouter.delete("/api/reports/:reportId", (req, res) => {

    deleteReport(req, res);

})
reportsRouter.post("/api/reports" , (req,res)=>{
    createReport(req,res);
})

export { reportsRouter };
