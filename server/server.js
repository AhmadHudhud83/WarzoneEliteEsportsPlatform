import  express  from "express";
import {connectToDB} from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";

import { routerGame } from "./routes/gameRoutes.js";
import { PlayerRoute } from "./routes/PlayerRoute.js";
import { OrganizerRoute } from "./routes/OrganaizerRoute.js";
import { SupervaisorRoute } from "./routes/supervaisorRout.js";
import session from "express-session";

import { tournamentRouter } from "./routes/tournamentRoutes.js"
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
const app = express();

app.use(bodyParser.json());
app.use(cors());
const sessionCookieLifeTime = 1000 * 60 * 15;
app.use(session({
    secret: "Muy8fuSOYHDsR6WOCwNS6K6sy2QmhSEp",
    saveUninitialized:true,
    cookie: { maxAge: sessionCookieLifeTime },
    resave: false
}));

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')))



app.use(express.json());
app.use(routerGame);
app.use(PlayerRoute);
app.use(OrganizerRoute);
app.use(SupervaisorRoute);
app.use(tournamentRouter)


//Database config
    connectToDB().then(()=>{
        console.log("Connect with DB");
        app.listen(5000, () => {
            console.log('Server started in port 5000 ');
        });  
    
    }).catch((err) => console.log(err));
 





