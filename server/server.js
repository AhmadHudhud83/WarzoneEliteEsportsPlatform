//CREATE THE SERVER
const express = require ("express")
const app = express();
const _PORT = 5000;
const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:3000', 
  }));
  app.use(express.json());
//CONNECT TO MONGO DB
console.log(process.env.DATABASE)
const mongoose = require("mongoose");
const username = process.env.AHMAD_HUDHUD_USERNAME,
      password =process.env.AHMAD_HUDHUD_PASSWORD,
      database = process.env.DATABASE;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ue5yau5.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{    

//CHECKING IF CONNECTION WITH DB IS SUCCESSFUL OR FAILED
console.log("connected successfully")
}).catch((error)=>{
    console.log("Error with connecting with database",error)
})
//IMPORT USER MODEL
const UserModel = require('./models/Users')
// Use the cors middleware to allow requests from a specific origin



app.get("/",(req,res)=>{

    res.send("test")

})

app.get("/users",async (req,res)=>{
  const users = await  UserModel.find();
    res.json(users)
})

app.get("/api",(req,res)=>{
    
    res.json({"users":["Ahmad","Islam","Kareem","Osama","Areen","Ahmad adel","Rama","Bissan"]})
})
app.listen(5000,()=>{
    console.log(`Server started in port ${_PORT}`)
})

