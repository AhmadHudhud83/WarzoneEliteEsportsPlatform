import  express  from "express";
import {connectToDB} from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";
import { routerGame } from "./routes/gameRoutes.js"
import { tournamentRouter } from "./routes/tournamentRoutes.js"
 import path from "path";
 import { fileURLToPath } from 'url';
import { reportsRouter } from "./routes/reportRoutes.js";

const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
const app = express();
//const jsonParser = bodyParser.json({limit:'50mb'});

//app.use(jsonParser);
app.use(cors());
app.use(express.json());
//Routes
app.use(routerGame);
app.use(tournamentRouter)
//app.use(reportsRouter)
app.use('/public', express.static(path.join(__dirname, 'public')))



//Database config
    connectToDB().then(()=>{
        console.log("Connect with DB");
        app.listen(5000, () => {
            console.log('Server started in port 5000 ');
        });  
    
    }).catch((err) => console.log(err));
 





