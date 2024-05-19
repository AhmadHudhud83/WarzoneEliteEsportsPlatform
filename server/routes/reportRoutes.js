import express from 'express'; 

import { getReportsById , getAllReports } from '../controllers/reportsController.js';
const reportsRouter = express.Router(); 

reportsRouter.get('/api/reports' , (req,res) => {

getAllReports(req,res);


})

reportsRouter.get("/api/reports/:reportId" ,(req,res)=> {

getReportsById(req,res);


})

export {reportsRouter};
