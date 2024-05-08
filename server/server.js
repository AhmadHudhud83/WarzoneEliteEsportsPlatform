import  express  from "express";
import {connectToDB} from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";
import { routerGame } from "./routes/gameRoutes.js"
import { tournamentRouter } from "./routes/tournamentRoutes.js"
const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cors());
//app.use(express.json());
//Routes
app.use(routerGame);
app.use(tournamentRouter)





//Database config
    connectToDB().then(()=>{
        console.log("Connect with DB");
        app.listen(5000, () => {
            console.log('Server started in port 5000 ');
        });  
    
    }).catch((err) => console.log(err));
 





