import { body,query} from "express-validator";
import bcrypt from "bcrypt";
import { StatusCode } from "../HTTPStatusCode/StatusCode.js";
import { Supervaisor } from "../models/supervaisor.js";



export const AllSupervaisor = async(req,res)=>{
    try{
        const supervaisors = await Supervaisor.find({});
        res.status(StatusCode.Ok).send(supervaisors);
    }
    catch(e){
        res.status(StatusCode.ServerError).send("Server busy try again later");
    }
}


export const LoginSupervaisor = async(req,res)=>{
    const {name , password}=req.body;
        try{ 
            const user = await Supervaisor.findOne({name : name});
            if(user){
                const CorrectPassword = await bcrypt.compare(password , user.password);
                if(CorrectPassword){
                    return res.status(StatusCode.Ok).send("Welecom to home page");
                }
                else{
                    return res.status(StatusCode.Unauthorized).send("incorrect password");
                }
            }
            else{
                return res.status(StatusCode.NotFound).send("user not found");
            }
        }
        catch(e){
            res.status(StatusCode.ServerError).send("server busy try again latter");
        }
}


export const SignUpSupervaisor = async(req,res)=>{
    const{name , email , password} = req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password , saltRounds);
    try{
        const NewSupervaisor = new Supervaisor({
            name,
            email,
            password:hash
        });
        await NewSupervaisor.save();
        res.status(StatusCode.Ok).send("Created successfully");
    }
    catch(e){
        return res.status(StatusCode.BadRequst).send({message:"the name is exist for anothor account"} );
    }
}

export const UpdateSupervaisor = async(req,res)=>{
    const {id,name ,email,password} =req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password , saltRounds);
    try{
        const checkName = await Supervaisor.findOne({name:name});
        if(checkName===null){
            const UpdateSupervaisor = await Supervaisor.updateOne(
                {_id:id},
                {
                    name:name,
                    email:email,
                    password:hash
                }
                
            );
            if(UpdateSupervaisor.modifiedCount !=0){
                res.status(StatusCode.Ok).send("True");
            }
            else{
                res.status(StatusCode.NotFound).send("false");
            }
        }
        else{
            res.status(StatusCode.BadRequst).send("name exist for anothor account");
        }
       

    }
    catch(e){
        return res.status(StatusCode.ServerError).send("System error Updating" , e);
    }

}


export const DeleteSupervaisor = async(req,res)=>{
    const {id} = req.query;
    try{
        const DeleteSupervaisor = await Supervaisor.deleteOne({_id:id});

        if(DeleteSupervaisor.deletedCount != 0){
            return res.status(StatusCode.Ok).send("true");
        }
        else{
            return res.status(StatusCode.NotFound).send("user not found");
        }

    }
    catch(e){
        return res.status(StatusCode.ServerError).send("System error Deleting" , e);
    }
}