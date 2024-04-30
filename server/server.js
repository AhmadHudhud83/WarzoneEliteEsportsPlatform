import {connectToDB} from "./DataBaseConnection/dbconnection.js"
import  express  from "express";
const app = express();
const _PORT = 5000;
import cors from "cors";
app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);
app.use(express.json());
//CONNECT TO MONGO DB


    connectToDB().then(()=>{
        console.log("Connect with DB");
        app.listen(5000, () => {
            console.log(`Server started in port ${_PORT}`);
        });
    
    }).catch((err) => console.log(err));






