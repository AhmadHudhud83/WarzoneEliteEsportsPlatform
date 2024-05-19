import { body,query} from "express-validator";

import bcrypt from "bcryptjs";
import { StatusCode } from "../HTTPStatusCode/StatusCode.js";
import { Player } from "../models/Player.js";

export const GetPlayer = async(req,res)=>{
    const {id} = req.query;
    try{
        const player = await Player.findOne({_id:id});
        if(player){
            res.status(StatusCode.Ok).send(player);
        }

        else{
            res.status(StatusCode.NotFound).send("Player not found");
        }

    }
    catch(e){
        res.status(StatusCode.ServerError).send("Server busy try again later");
    }
}


export const AllPlayer = async(req,res)=>{
    try{
        const players = await Player.find({});
        res.status(StatusCode.Ok).send(players);
    }
    catch(e){
        res.status(StatusCode.ServerError).send("Server busy try again later");
    }
}

export const LoginPlayer = async(req,res)=>{
    const { name, password } = req.body;

    try {
        if (req.session && req.session.user_id) {
            return res.status(StatusCode.Ok).send('Already logged in');
        }

        const user = await Player.findOne({ name });
        if (!user) {
            return res.status(StatusCode.NotFound).send('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(StatusCode.NotFound).send('Incorrect password');
        }

        req.session.user_id = user.name;

        return res.status(StatusCode.Ok).send('Welcome to the home page');
    } catch (error) {
        console.error('Login error:', error);
        return res.status(StatusCode.ServerError).send('Server busy, try again later');
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
        return res.status(StatusCode.BadRequst).send({message:"the name is exist for anothor account"} );
    }
}

export const UpdatePlayer = async(req,res)=>{
    const {id,name ,email,password} =req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password , saltRounds);
    try{
        const checkName = await Player.findOne({name:name});
        if(checkName===null){
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

        else{
            res.status(StatusCode.BadRequst).send("name exist for anothor account");
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
            return res.status(StatusCode.Ok).send("updated successfuly");
        }
        else{
            return res.status(StatusCode.NotFound).send("user not found");
        }

    }
    catch(e){
        return res.status(StatusCode.ServerError).send("System error Deleting" , e);
    }
}