import { ReportsModel } from "../models/Reports";

export const getAllReports = async (req, res) => {
    try {
        const reports = await ReportsModel.find();
        res.json(reports);
        
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Failed to retrieve reports" });
    }
}

export const getReportsById = async(req,res)=>{
    try{
  
        const report =await ReportsModel.findById(req.params.reportId)
        if(report){
            res.status(200).json(report);
        }else{
            res.status(404).json({message:"report not found"})
        }
    }catch{(e)=>{
        console.error(e)
        res.status(500).json({message:"Something went wrong"})
    }}
}
