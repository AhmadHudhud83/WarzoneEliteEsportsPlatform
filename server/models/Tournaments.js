
import mongoose, { Schema } from "mongoose"
import Joi from "joi";
const TournamentSchema  = new mongoose.Schema({
    game:{
        type:String,
        trim:true,
        //type:Schema.Types.ObjectId,
       // ref:"games",
        required:true,
       
    
    },
    title:{
        type:String,
        required:true,
       trim:true,
       minlength:4,
       maxlength:100
    },
    start_date:{
        type:String,
        required:true,
       trim:true,
      
    },
    start_time:{
        type:String,
        required:true,
       trim:true,
    },
    about:{
        type:String,
        default:"Not Available",
    
       
    },
    contact_details:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:(v)=>{
               
                    const pattern = new RegExp(
                      "^(https?:\\/\\/)?" +
                        "(?:www\\.)?" +
                        "[a-zA-Z0-9.-]+" +
                        "\\.[a-zA-Z]{2,}" +
                        "(\\/[\\w-]+)*" +
                        "(\\?[\\s\\S]*)?" +
                        "(\\#[\\s\\S]*)?$",
                      "i"
                    )
                    return pattern.test(v);
                  
            },
            message:props => `${props.value} isn't a valid URL...`
        }
        
    },
    rules:{
        type:String,
            
        
        default:"Not Available"
       , optional:true,
    },
    prize:{
        type:String,
        
        default:"Not Available"
       , 
    },
    description:{
        type:String,
        default:"Not Available"
  
    },
    schedule:{
        type:String,
        default:"Not Available"
       , optional:true,
    },
    format:{
        type:String,
        default:"Teams"
    } ,
    platform:{
        type:String,
        default:"Combained"
       
    },
    tournament_status:{
        type:String,
        default:"Opened"
        
    },
    registeration_status:{
        type:String,
        default:"Opened"
        
    },
    max_participants:{
            type:Number,
            required:true,
            min:[10,"the value must be equal or more than 10"],
            default:0

    },
    cover_image_url:{
        type:String,
        //required:true
    // default:"https://i.imgur.com/CqiHFdW.pngcxczc"
    },
    announcements:{
        type:Array,
        default:["Welcome to my tournament","Consider Being a nice person !"],
        
    },
    sponsors: [{
        _id:false,
        brand: { type: String, required: true },
        email: { type: String, required: true },
      }],
    supervisors:{
       type:[String],
        required:true,
     //  validate:{
       // validator:(v)=>v.length > 0,
       // message:"There must be atleast one supervisor for this tournament."
      // }

        
    }

    
    
    

},{
    timestamps:true //for the creation date
})
//contact details URL custom validation function
const contact_details_url_validation = (value, helpers) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "(?:www\\.)?" +
        "[a-zA-Z0-9.-]+" +
        "\\.[a-zA-Z]{2,}" +
        "(\\/[\\w-]+)*" +
        "(\\?[\\s\\S]*)?" +
        "(\\#[\\s\\S]*)?$",
      "i"
    );
    if (pattern.test(value)) {
      return value;
    } else {
      return helpers.error(`${value} isn't a valid URL...`);
    }
  };
  
  //validation of creating tournament schema
  
  const tournamentJoiSchema = Joi.object({
    game: Joi.string().trim().required().min(3),
    title: Joi.string().trim().min(4).max(100).required(),
    contact_details: Joi.string()
      .custom(contact_details_url_validation)
      .trim()
      .required(),
    start_date: Joi.string().trim().required(),
    start_time: Joi.string().trim().required(),
    max_participants: Joi.number().min(10).required(),
    about: Joi.string().default("Not Available"),
    rules: Joi.string().default("Not Available"),
    prize: Joi.string().default("Not Available"),
    schedule: Joi.string().default("Not Available"),
    format: Joi.string().default("Teams"),
    platform: Joi.string().default("Combained"),
    description: Joi.string().default("Not Available"),
    tournament_status: Joi.string().valid('Opened', 'Closed').default("Opened"),
    registeration_status: Joi.string().valid('Opened', 'Closed').default("Opened"),
    cover_image_url: Joi.string().default("hello world"), /////////////////////
  
    announcements: Joi.array().default([
      "Welcome to my tournament",
      "Consider Being a nice person !",
    ]),
    sponsors: Joi.array().items(
      Joi.object({
        brand: Joi.string().required(),
        email: Joi.string().required(),
      })
    ),
    supervisors: Joi.array().default(["123", "8910"]),
  });
  
  //the tournament validation function , create or update
 export const tournamentValidation = (tournamentObject, method) => {
    let schema;
    if (method === "POST") {
      schema = tournamentJoiSchema;
    } else if (method === "PUT") {
      schema = tournamentJoiSchema.keys({
        game: Joi.string().trim().min(3),
        title: Joi.string().trim().min(4).max(100),
        contact_details: Joi.string()
          .custom(contact_details_url_validation)
          .trim(),
        start_date: Joi.string().trim(),
        start_time: Joi.string().trim(),
        max_participants: Joi.number().min(10),
      });
    }
  
    return schema.validate(tournamentObject);
  };

export const TournamentModel = mongoose.model("Tournament",TournamentSchema)
