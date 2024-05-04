import mongoose  from "mongoose";

 const connectToDB = async() => {
    const username = process.env.AHMAD_HUDHUD_USERNAME,
    password = process.env.AHMAD_HUDHUD_PASSWORD,
    database = process.env.DATABASE;
    await mongoose.connect(
        `mongodb+srv://${username}:${password}@cluster0.ue5yau5.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
    );
};

export {connectToDB};