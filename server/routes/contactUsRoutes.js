import  express  from "express";
import ContactUsModel from "../models/contactUs.js";

const ContactRoute = express.Router();

ContactRoute.post('/',  async (req, res) => {
  
    const {name , company , email , goal , industry} = req.body;
    const newContact = new ContactUsModel({name , company , email , goal , industry  });
    try {
     await   newContact.save();
      res.status(201).json (newContact);
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).send('Failed to save the contact');
    }
  });
  export  {ContactRoute};