import { StatusCode } from "../HTTPStatusCode/StatusCode.js";

export const CheckAuthAdmin = (req,res)=>{
    if(req.session && req.session.admin_id){
        return res.status(StatusCode.Ok).send({ authenticated: true });
    } 
    else {
        return res.status(StatusCode.Unauthorized).send({ authenticated: false });
    }
}

export const CheckAuthSupervisor = (req,res)=>{
    if(req.session && req.session.supervaisor_id){
        return res.status(StatusCode.Ok).send({ authenticated: true });
    } 
    else {
        return res.status(StatusCode.Unauthorized).send({ authenticated: false });
    }
}

export const CheckAuthPlayer = (req,res)=>{
    if(req.session && req.session.user_id){
        return res.status(StatusCode.Ok).send({ authenticated: true });
    } 
    else {
        return res.status(StatusCode.Unauthorized).send({ authenticated: false });
    }
}