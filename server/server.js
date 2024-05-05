
const express = require("express");
const app = express();
const _PORT = 5000;
const cors = require("cors");
app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);
app.use(express.json());
//CONNECT TO MONGO DB
console.log(process.env.DATABASE);
const mongoose = require("mongoose");
const username = process.env.AHMAD_HUDHUD_USERNAME,
    password = process.env.AHMAD_HUDHUD_PASSWORD,
    database = process.env.DATABASE;

const client = mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.ue5yau5.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
);
const UserModel = require("./models/Users");
const gamesRoute = require("./routes/gameRoutes")
app.use("/games", gamesRoute);

app.get("/api", (req, res) => {
    res.json({
        users: [
            "Ahmad",
            "Islam",
            "Kareem",
            "Osama",
            "Areen",
            "Ahmad adel",
            "Rama",
            "Bissan",
        ],
    });
});

    app.post("/sponsors",(req,res)=>{
        


    })

app.listen(5000, () => {
    console.log(`Server started in port ${_PORT}`);
});

