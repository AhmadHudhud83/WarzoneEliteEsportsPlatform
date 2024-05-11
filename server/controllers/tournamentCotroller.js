import { TouranmentModel } from "../models/Tournaments.js";
import Joi from "joi"; //for a better valdiation
/**
 * @desc Create a new tournament
 * @route /api/tournaments
 * @method POST
 * @access private
 *
 */
export const createTournament = async(req,res)=>{
       //custom empty data validation function
        const newReqBody=emptyDataValidation(req.body)
        const { error } = creatingTournamentValidation(newReqBody);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
        try {
          const tournament = new TouranmentModel({
            game: req.body.game,
            title: req.body.title,
            contact_details: req.body.contact_details,
            start_date: req.body.start_date,
            start_time: req.body.start_time,
            max_participants: req.body.max_participants,
            about: req.body.about,
            rules: req.body.rules,
            prize: req.body.prize,
            schedule: req.body.schedule,
            format: req.body.format,
            description: req.body.description,
            tournament_status: req.body.tournament_status,
            registeration_status: req.body.registeration_status,
            cover_image_url: req.body.cover_image_url,
            announcements: req.body.announcements,
            sponsors: req.body.sponsors,
            supervisors:req.body.supervisors,
            
          });
          const result = await tournament.save();
          res.status(201).json(result);
          console.log(typeof(req.body.rules),"YEAH BOY")
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Something went wrong" });
        }
 
        
}
//empty values validation
const emptyDataValidation = (tournamentObject)=>{
  const defaultValue = "Not Available"
  
  if(tournamentObject.about===""){
    tournamentObject.about=defaultValue
  }
  if(tournamentObject.rules===""){
    tournamentObject.rules=defaultValue
  }
  if(tournamentObject.about===""){
    tournamentObject.about=defaultValue
  }
  if(tournamentObject.description===""){
    tournamentObject.description=defaultValue
  }
  if(tournamentObject.schedule===""){
    tournamentObject.schedule=defaultValue
  }
  return tournamentObject
  

}
//contact details URL validation  
const contact_details_url_validation = (value,helpers)=>{
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
      if(pattern.test(value)){
        return value
      }else{
        return helpers.error(`${value} isn't a valid URL...`)
      }
}
//validation of creating tournament
const creatingTournamentValidation = (tournamentObject) => {
  
  const schema = Joi.object({
    game: Joi.string().trim().required(),
    title: Joi.string().trim().min(4).max(100).required(),
    contact_details: Joi.string().custom(contact_details_url_validation).trim().required(),
    start_date: Joi.string().trim().required(),
    start_time: Joi.string().trim().required(),
    max_participants: Joi.number().min(10).required(),
    about: Joi.string().optional().default("Not Available"),
    rules: Joi.string().optional().default("Not Available"),
    prize: Joi.string().optional().default("Not Available"),
    schedule: Joi.string().optional().default("Not Available"),
    format: Joi.string().default("Teams"),
    platform: Joi.string().default("Combained"),
    description: Joi.string().optional().default("Not Available"),
    tournament_status: Joi.string().default("Opened"),
    registeration_status: Joi.string().default("Closed"),
    cover_image_url: Joi.string().optional().default("https://i.imgur.com/CqiHFdW.png"),
    announcements: Joi.array().default([
      "Welcome to my tournament",
      "Consider Being a nice person !",
    ]),
    sponsors: Joi.object().default({
      brand: "brand.inc",
      email: "brand@example.com",
    }),
    supervisors:Joi.array().default(["123","8910"])
    
  });

  return schema.validate(tournamentObject);
}





export const getTournamentById = async (req,res)=>{
  try{
  const tournament = await TouranmentModel.findById(req.params.id)
  if(tournament){
    res.status(200).json(tournament)

  }else{
    res.status(404).json({message:"error :tournament not found"})
  }}catch(error){
    console.error(error)
    res.status(500).json({message:"Something went wrong"})
  }
}

