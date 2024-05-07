import  express  from "express";
import {connectToDB} from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";
import { routerGame } from "./routes/gameRoutes.js";
import { PlayerRoute } from "./routes/PlayerRoute.js";
import { OrganizerRoute } from "./routes/OrganaizerRoute.js";
import { SupervaisorRoute } from "./routes/supervaisorRout.js";

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(express.json());
app.use(cors());
app.use(routerGame);
app.use(PlayerRoute);
app.use(OrganizerRoute);
app.use(SupervaisorRoute);


    connectToDB().then(()=>{
        console.log("Connect with DB");
        app.listen(5000, () => {
            console.log('Server started in port 5000 ');
        });  
    
    }).catch((err) => console.log(err));
 





