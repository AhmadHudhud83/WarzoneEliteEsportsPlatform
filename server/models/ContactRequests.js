import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullName: {type: String, required:true},
    company: {type: String, required:true},
    email: {type: String, required:true},
    mainGoal:{type: String, required:true},
    industry: {type: String, required:true}
});

const Contact = mongoose.model('contacts', contactSchema);
export default Contact;


app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).send(err);
    }
});