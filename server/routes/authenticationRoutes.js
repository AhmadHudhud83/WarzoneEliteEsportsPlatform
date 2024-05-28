import  express  from "express";
import { CheckAuthAdmin, CheckAuthPlayer, CheckAuthSupervisor } from "../controllers/AuthenticationController.js";


export const AuthRoute = express.Router();


AuthRoute.get('/admin/check-auth' , async(req,res)=>{
        CheckAuthAdmin(req,res);
    }
);

AuthRoute.get('/supervisor/check-auth' , async(req,res)=>{
    CheckAuthSupervisor(req,res);
}
);

AuthRoute.get('/player/check-auth' , async(req,res)=>{
    CheckAuthPlayer(req,res);
}
);