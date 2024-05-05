import  express  from "express";
import {connectToDB} from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";
import { routerGame } from "./routes/gameRoutes.js";

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cors());
app.use(routerGame);
app.use(express.json());



    app.post("/sponsors",(req,res)=>{
        


    })

app.listen(5000, () => {
    console.log(`Server started in port ${_PORT}`);
});

