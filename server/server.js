import  express  from "express";
import {connectToDB} from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";

const jsonParser = bodyParser.json();

const app = express();
app.use(jsonParser);

app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);
app.use(express.json());


    connectToDB().then(()=>{
        console.log("Connect with DB");
        app.listen(5000, () => {
            console.log('Server started in port 5000 ');
        });
    
    }).catch((err) => console.log(err));






