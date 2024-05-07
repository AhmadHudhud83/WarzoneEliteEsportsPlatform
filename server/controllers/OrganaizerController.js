import { body,query} from "express-validator";
import bcrypt from "bcrypt";
import { StatusCode } from "../HTTPStatusCode/StatusCode.js";
import { Organizer } from "../models/organizer.js";

export const LoginOrganaizer = async(req,res)=>{
    const {name , password}=req.body;
    try{ 
        const user = await Organizer.findOne({name : name});
        if(user){
            const CorrectPassword = await bcrypt.compare(password , user.password);
            if(CorrectPassword){
                return res.status(StatusCode.Ok).send("Welecom to home page");
            }
            else{
                return res.status(StatusCode.BadRequst).send("incorrect password");
            }
        }
        else{
            return res.status(StatusCode.NotFound).send("user not found");
        }
    }
    catch(e){
        res.status(StatusCode.ServerError).send("server busy try again latter");
    }
};


export const SignUpOrganaizer = async(req,res)=>{
    const{name , email , password} = req.body;
    try{
        const saltRounds = 10;
        const hash = await bcrypt.hash(password , saltRounds);
        const NewOrganizer = new Organizer({
            name,
            email,
            password:hash
        });
        await NewOrganizer.save();
        res.status(StatusCode.Ok).send("Created successfully");
    }
    catch(e){
        return res.status(StatusCode.ServerError).send({message:"System busy....try again latter"} );
    }
};

export const DeleteOrganaizer = async(req,res)=>{

}