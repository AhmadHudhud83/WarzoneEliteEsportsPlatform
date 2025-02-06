import { body,query} from "express-validator";
import bcrypt from "bcrypt";
import { StatusCode } from "../HTTPStatusCode/StatusCode.js";
import { Organizer } from "../models/Organizer.js";

export const LoginOrganaizer = async(req,res)=>{
    const { name, password } = req.body;

    try {
        if (req.session && req.session.admin_id) {
            return res.status(StatusCode.Ok).send('Already logged in');
        }

        const user = await Organizer.findOne({ name });
        if (!user) {
            return res.status(StatusCode.NotFound).send('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(StatusCode.NotFound).send('Incorrect password');
        }
        

        req.session.admin_id = user._id;
        
        return res.status(StatusCode.Ok).send('Welcome to the home page');
    } catch (error) {
        console.error('Login error:', error);
        return res.status(StatusCode.ServerError).send('Server busy, try again later');
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
        return res.status(StatusCode.BadRequst).send({message:"the name is exist for anothor account"} );
    }
};


