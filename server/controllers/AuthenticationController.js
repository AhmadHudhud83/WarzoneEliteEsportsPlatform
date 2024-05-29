import { StatusCode } from "../HTTPStatusCode/StatusCode.js";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';



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

export const logout = (req,res)=>{
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Failed to log out');
            }
            
            
            res.clearCookie('connect.sid');
            return res.status(StatusCode.Ok).send('Logged out');
        });
    } else {
        return res.status(400).send('No session to log out from');
    }
}