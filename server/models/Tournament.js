
import mongoose, { Schema } from "mongoose"
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

export const TouranmentModel = mongoose.model("Tournament",TournamentSchema)
