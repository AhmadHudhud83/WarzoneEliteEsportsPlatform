import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
  name: 
  { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    goal: { type: String, required: true },
    industry: { type: String, required: true }
});

const ContactUsModel = mongoose.model('contacts', contactUsSchema);
export default  ContactUsModel;