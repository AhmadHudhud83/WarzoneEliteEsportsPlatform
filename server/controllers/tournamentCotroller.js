import { TouranmentModel } from "../models/Tournaments.js";
import Joi from "joi"; //for a better valdiation
/**
 * @desc Create a new tournament
 * @route /api/tournaments
 * @method POST
 * @access private
 *
 */
export const createTournament = async (req, res) => {
  //custom empty or undefined data validation function

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
  // if there is no tournament cover uploaded , then there is a default image cover accroding to the game selected
  const defaultTournamentCoverImage = () => {
    //1st scenario : cover_image_url is undefined or not sent due to any reason,set to the default tournament banner of the website
    if (!req.body.cover_image_url) {
      return "https://i.imgur.com/KHneQTJ.png";
    } else if (req.body.game === "CS2") {
      return "https://i.imgur.com/7lr8WWw.png";
    } else if (req.body.game === "Valorant") {
      return "https://seeklogo.com/images/V/valorant-logo-FAB2CA0E55-seeklogo.com.png";
    } else if (req.body.game === "Dota 2") {
      return "https://i.redd.it/e8k5dhz958va1.jpg";
    } else if (req.body.game === "League of Legends") {
      return "https://images.prismic.io/play-vs/6c423286e877921fb6659122b16e1845df833e1f_league-of-legends-hero-splash.jpg?auto=compress,format";
    } else if (req.body.game === "Overwatch") {
      return "https://images.nintendolife.com/1558f6cd6d6fe/overwatch-2-cover.cover_large.jpg";
    } else if (req.body.game === "Rainbow Six Siege") {
      return "https://cdn.vox-cdn.com/thumbor/dOyerwaJUC0uadaE18Ll-lst4K4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16000420/rainbow_six_siege_elite_skins_hero.jpg";
    } else if (req.body.game === "Rocket League") {
      return "https://upload.wikimedia.org/wikipedia/commons/e/e0/Rocket_League_coverart.jpg";
    } else if (req.body.game === "Fortnite") {
      return "https://cdn.vox-cdn.com/thumbor/fvf8xI-bdpHhUwO_O3QyhLhlt7M=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21822797/Fortnite_C2S4_BPLineup.jpg";
    } else if (req.body.game === "PUBG") {
      return "https://assetsio.gnwcdn.com/pubg-tips-tricks-guide-battlegrounds-4415-1513099928095.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp";
    } else if (req.body.game === "Apex Legends") {
      return "https://image.api.playstation.com/vulcan/ap/rnd/202401/1810/63e55900b867e1d9e50bf139f92fe1fe94e9a048503990d3.png";
    } else if (req.body.game === "Hearthstone") {
      return "https://sm.ign.com/t/ign_it/screenshot/default/hearthstone_fxgu.1280.jpg";
    } else if (req.body.game === "Smite") {
      return "https://cdn1.epicgames.com/offer/16ed9f15b1b449ccb59cb610b13df5b8/EPIC-MarketingSizes-1r1-1920x1080_1920x1080-2b0de61ac94515759c64f914188ca9b5?h=270&quality=medium&resize=1&w=480";
    } else if (req.body.game === "World of Warcraft") {
      return "https://assetsio.gnwcdn.com/World-Of-Warcraft-Wrath-Of-The-Lich-King.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp";
    } else if (req.body.game === "Starcraft 2") {
      return "https://bnetcmsus-a.akamaihd.net/cms/blog_header/ci/CIGT53U8ZP6M1509744317189.jpg";
    } else if (req.body.game === "FIFA") {
      return "https://cdn.akamai.steamstatic.com/steam/apps/1506830/capsule_616x353.jpg?t=1712678728";
    } else if (req.body.game === "NBA 2K") {
      return "https://e0.365dm.com/22/09/1600x900/skysports-nba-nba-2k23_5915425.jpg?20220930185017";
    } else if (req.body.game === "Madden") {
      return "https://image.api.playstation.com/vulcan/ap/rnd/202402/2715/888de44bc0feb81861b9b7fe789c077df1de1e803e01a848.png";
    } else return "https://i.imgur.com/KHneQTJ.png"; //same for the game name (if not provided)
  };

    req.body.cover_image_url = defaultTournamentCoverImage();

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
      game: Joi.string().trim().min(4),
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
  const { error } = tournamentValidation(req.body, "PUT");
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
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
          cover_image_url: req.body.cover_image_url,
          announcements: req.body.announcements,
          sponsors: req.body.sponsors,
          supervisors: req.body.supervisors,
        },
      },
      { new: true }
    );

    res.status(200).json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
