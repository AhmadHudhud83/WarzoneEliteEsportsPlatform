import  express  from "express";
import {connectToDB} from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";
import { routerGame } from "./routes/gameRoutes.js";

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(routerGame);
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);


    connectToDB().then(()=>{
        console.log("Connect with DB");
        app.listen(5000, () => {
            console.log('Server started in port 5000 ');
        });  
    
    }).catch((err) => console.log(err));
 





