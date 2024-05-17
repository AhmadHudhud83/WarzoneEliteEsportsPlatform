import { TouranmentModel } from "../models/Tournaments.js";
import Joi from "joi"; //for a better valdiation
import fs from "fs"
import axios from "axios"
/**
 * @desc Create a new tournament
 * @route /api/tournaments
 * @method POST
 * @access private
 *
 */
export const createTournament = async (req, res) => {

  //get games from mongoDB request
   const getCoverImageUrl =async (gameName)=>{
    let defaultImage = "https://i.imgur.com/KHneQTJ.png"
    try{
      const respones = await axios.get("http://localhost:5000/api/Games")
      const games =respones.data;
      const game = games.find(g=>g.name===gameName
       
      )
      if(game){
        return game.imgUrl
      }
      console.log("gameResponse DATA is : ",gameResponse.data)
    }catch(err){
      console.error("ERROR",err)
    }
    return defaultImage
  }

  console.log("body: ", req.body);
  console.log("file: ", req.file);
  console.log("cover image url  : ", req.body.cover_image_url);
  // if (!req.file) {
  //   return res.status(400).json({ message: 'No file uploaded' });
  // }

  let parsedSponsors;
  try {
    parsedSponsors = JSON.parse(req.body.sponsors);
  } catch (error) {
    console.error("parsing error", error);
  }
  console.log("sponsors:  ", parsedSponsors);

  console.log(
    "type of sponsors attribute from client is : ",
    typeof parsedSponsors
  );
  //==================JOI VALIDATION (EXPRESS LEVEL VALIDAITON)=====================
  //parse the sponsors array of objects
  req.body.sponsors = parsedSponsors;
  //setting the cover_image_url

  req.body.cover_image_url =await getCoverImageUrl(req.body.game)
  const { error } = tournamentValidation(req.body, "POST");
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
      cover_image_url: req.file ? req.file.path : req.body.cover_image_url, //uploading an image is optional,if not uploaded then it takes the default cover value based on the seletcted game
      announcements: req.body.announcements,
      sponsors: req.body.sponsors,
      supervisors: req.body.supervisors,
      //image:req.file.filename
    });
    const result = await tournament.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//empty values validation
// const emptyDataValidation = (tournamentObject) => {
//   const defaultValue = "Not Available";

//   if (tournamentObject.about === ""||tournamentObject.about==="undefined") {
//     tournamentObject.about = defaultValue;
//   }

//   if (tournamentObject.rules === ""||tournamentObject.rules==="undefined") {
//     tournamentObject.rules = defaultValue;
//   }
//   if (tournamentObject.description === ""||tournamentObject.description==="undefined") {
//     tournamentObject.description = defaultValue;
//   }
//   if (tournamentObject.schedule === ""||tournamentObject.schedule==="undefined") {
//     tournamentObject.schedule = defaultValue;
//   }
//   if (tournamentObject.prize === ""||tournamentObject.prize==="undefined") {
//     tournamentObject.prize = defaultValue;
//   }
//   return tournamentObject;
// };
//contact details URL validation
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
  tournament_status: Joi.string().default("Opened"),
  registeration_status: Joi.string().default("Closed"),
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
const tournamentValidation = (tournamentObject, method) => {
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

/**
 * @desc get a tournament by id for the user
 * @route /api/tournaments/:id
 * @method GET
 * @access public
 *
 */

export const getTournamentById = async (req, res) => {
  try {
    const tournament = await TouranmentModel.findById(req.params.id);
    if (tournament) {
      res.status(200).json(tournament);
    } else {
      res.status(404).json({ message: "error :tournament not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
/**
 * @desc update a tournament
 * @route /api/tournaments/:id
 * @method PUT
 * @access private
 *
 */
export const updateTournament = async (req, res) => {
  //  const newReqBody = emptyDataValidation(req.body);
  const parsedSponsors = JSON.parse(req.body.sponsors)
  delete req.body._id
  delete req.body.createdAt
  delete req.body.updatedAt
  delete req.body.__v
  console.log(req.file)
  req.body.sponsors=parsedSponsors
  const { error } = tournamentValidation(req.body, "PUT");
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  //find the old tournament data to remove the old image cover if a newer cover has been uploaded (with file system package)
  if(req.file){ // when any file (image) uploaded , then delete the old image cover
    try{
    
      const oldTournament= await TouranmentModel.findById(req.params.id)
      if(!oldTournament){
        res.status(404).json({message:"old tournament not found"})
      }
      if(oldTournament.cover_image_url){
        fs.unlinkSync(oldTournament.cover_image_url)
      }
    }catch(err){
      console.log("old tournament error",err)
    }
      
  }
  
  //================================================================
  try {
    const tournament = await TouranmentModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
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
          cover_image_url: req.file? req.file.path : req.body.cover_image_url,
          announcements: req.body.announcements,
          sponsors: req.body.sponsors,
          supervisors: req.body.supervisors,
        },
      },
      { new: true }
    );
    console.log(req.body.cover_image_url)
    res.status(200).json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
