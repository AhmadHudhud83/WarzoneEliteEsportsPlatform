import express from "express";
import { connectToDB } from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";

import { routerGame } from "./routes/gameRoutes.js";
import { PlayerRoute } from "./routes/playerRoutes.js";
import { OrganizerRoute } from "./routes/organizerRoutes.js";
import {SupervisorRoute} from './routes/supervisorRoutes.js'
import session from "express-session";
import { tournamentRouter } from "./routes/tournamentRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { reportsRouter } from "./routes/reportRoutes.js";



import { blogRouter } from './routes/blogRoutes.js';


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
//Routes
app.use("/api/tournaments", tournamentRouter);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(blogRouter);
app.use(routerGame);
app.use(PlayerRoute);
app.use(OrganizerRoute);
app.use(SupervisorRoute);
app.use(reportsRouter);






//Database config
connectToDB()
  .then(() => {
    console.log("Connect with DB");
    app.listen(5000, () => {
      console.log("Server started in port 5000 ");
    });
  })
  .catch((err) => console.log(err));
