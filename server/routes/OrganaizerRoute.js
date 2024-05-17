import  express  from "express";
import { body,query} from "express-validator";
import{validate} from"../Utils/validator.js";
import { StatusCode } from "../HTTPStatusCode/StatusCode.js";
import { LoginOrganaizer, SignUpOrganaizer } from "../controllers/OrganaizerController.js";

export const OrganizerRoute = express.Router();


OrganizerRoute.post('/organizer/login' ,
    body("name").notEmpty().withMessage("Name is required"),
    body("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => validate(req, res, next, StatusCode.BadRequst),
    async(req,res)=>{
        LoginOrganaizer(req,res);
    }
);


OrganizerRoute.post('/organizer/signup' ,
    body("name")
        .notEmpty().withMessage("Name is required")
        .bail()
        .isAlpha().withMessage("Name must be alpha (a-z & A-Z)")
        .bail().isLength({min:4 , max:undefined}).withMessage("Name must be at least 4 char"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("email must be valid and include @"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        }).withMessage("the password must be 8 char & min_low 1 and min_Upper 1 and min_Num 1 for Strong password"),
    (req, res, next) => validate(req, res, next, StatusCode.BadRequst),

    async(req,res)=>{
        SignUpOrganaizer(req,res);
    }
);