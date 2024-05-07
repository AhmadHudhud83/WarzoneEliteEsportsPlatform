import { body,query} from "express-validator";

import bcrypt from "bcrypt";
import { StatusCode } from "../HTTPStatusCode/StatusCode.js";
import { Player } from "../models/player.js";

export const LoginPlayer = async(req,res)=>{
    const {name , password}=req.body;
        try{ 
            const user = await Player.findOne({name : name});
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


export const SignUpPlayer = async(req,res)=>{
    try{
        const{name , email , password} = req.body;
        const saltRounds = 10;
        const hash = await bcrypt.hash(password , saltRounds);
        const NewPlayer = new Player({
            name,
            email,
            password:hash
        });
        await NewPlayer.save();
        res.status(StatusCode.Ok).send("Created successfully");
    }
    catch(e){
        return res.status(StatusCode.ServerError).send({message:"Server error"} );
    }
}

export const UpdatePlayer = async(req,res)=>{
    const {id,name ,email,password} =req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password , saltRounds);
    try{
        const UpdatePlayer = await Player.updateOne(
            {_id:id},
            {
                name:name,
                email:email,
                password:hash
            }
            
        );
        if(UpdatePlayer.modifiedCount !=0){
            res.status(StatusCode.Ok).send("True");
        }
        else{
            res.status(StatusCode.NotFound).send("false");
        }

    }
    catch(e){
        return res.status(StatusCode.ServerError).send("System error Updating" , e);
    }

}


export const DeletePlayer = async(req,res)=>{
    const {id} = req.query;
    try{
        const DeletePlayer = await Player.deleteOne({_id:id});

        if(DeletePlayer.deletedCount != 0){
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