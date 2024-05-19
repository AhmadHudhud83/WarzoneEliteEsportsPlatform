
import  express  from "express";
import { body,query} from "express-validator";
import{validate} from"../Utils/validator.js";
import { AllPlayer, DeletePlayer, GetPlayer, LoginPlayer, SignUpPlayer, UpdatePlayer } from "../controllers/playerController.js";

import { StatusCode } from "../HTTPStatusCode/StatusCode.js";

export const PlayerRoute = express.Router();


PlayerRoute.get('/player/get' ,async(req,res)=>{
        GetPlayer(req,res);
    }
);

PlayerRoute.get('/player/allplayer',async(req,res)=>{
        AllPlayer(req,res);
    }
);

PlayerRoute.post('/player/login' ,
    body("name").notEmpty().withMessage("Name is required"),
    body("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => validate(req, res, next, StatusCode.BadRequst),
    async(req,res)=>{
        LoginPlayer(req,res);

    }
);


PlayerRoute.post('/player/signup' ,
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
        }).withMessage("the password must be min_Length 8 & min_low 1 and min_Upper 1 and min_Num 1 for Strong password"),
    (req, res, next) => validate(req, res, next, StatusCode.BadRequst),

    async(req,res)=>{
        SignUpPlayer(req,res);
    }
);

PlayerRoute.put("/player/update" ,
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
        UpdatePlayer(req,res);
    }
);

PlayerRoute.delete('/player/delete' ,
    query("id").isMongoId().withMessage("pleace enter the id for object in mongodb"),
    (req, res, next) => validate(req, res, next, StatusCode.BadRequst),
    async(req,res)=>{
        DeletePlayer(req,res);
    }
);