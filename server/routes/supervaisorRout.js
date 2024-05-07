import  express  from "express";
import { body,query} from "express-validator";
import{validate} from"../Utils/validator.js";
import { StatusCode } from "../HTTPStatusCode/StatusCode.js";
import { AllSupervaisor, DeleteSupervaisor, LoginSupervaisor, SignUpSupervaisor, UpdateSupervaisor } from "../controllers/SupervaisorController.js";

export const SupervaisorRoute = express.Router();


SupervaisorRoute.get('/supervisor/allsupervisor' ,async(req,res)=>{
        AllSupervaisor(req,res);
    }
);

SupervaisorRoute.post('/supervisor/add',
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
        SignUpSupervaisor(req,res);
    }
);

SupervaisorRoute.post('/supervisor/signin' ,async(req,res)=>{
        LoginSupervaisor(req,res);
    }
);


SupervaisorRoute.put('/supervisor/update',
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
        UpdateSupervaisor(req,res);
    }
);

SupervaisorRoute.delete('/supervisor/delete' ,
    query("id").isMongoId().withMessage("pleace enter the id for object in mongodb"),
    (req, res, next) => validate(req, res, next, StatusCode.BadRequst),
    
    async(req,res)=>{
        DeleteSupervaisor(req,res);
    }
);