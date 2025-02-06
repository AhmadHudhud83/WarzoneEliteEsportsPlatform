import express from "express";
import { connectToDB } from "./DataBaseConnection/dbconnection.js";
import bodyParser from "body-parser";
import cors from "cors";
import MongoStore from "connect-mongo";
import { routerGame } from "./routes/gameRoutes.js";
import { PlayerRoute } from "./routes/playerRoutes.js";
import { OrganizerRoute } from "./routes/organizerRoutes.js";
import { SupervisorRoute } from './routes/supervisorRoutes.js'
import session from "express-session";
import { tournamentRouter } from "./routes/tournamentRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { reportsRouter } from "./routes/reportRoutes.js";
import { feedbackRouter } from "./routes/feedbackRoutes.js";
import { blogRouter } from "./routes/blogRoutes.js";
import { tournamentAnnouncementsRouter } from "./routes/tournamentAnnouncementsRoute.js";
import { AuthRoute } from "./routes/authenticationRoutes.js";
import cookieParser from 'cookie-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const sessionCookieLifeTime = 1000 * 60 * 15;
app.use(session({
    secret: "Muy8fuSOYHDsR6WOCwNS6K6sy2QmhSEp",
    saveUninitialized:false,
    resave: false,
    cookie: { 
        maxAge: sessionCookieLifeTime,
        secure: false,
        httpOnly: true,
     },
    store: MongoStore.create(
      { 
        mongoUrl:  `mongodb+srv://${process.env.AHMAD_HUDHUD_USERNAME}:${process.env.AHMAD_HUDHUD_PASSWORD}@cluster0.ue5yau5.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority&appName=Cluster0`,
        dbName: process.env.DATABASE,
        autoRemove: 'interval',
        autoRemoveInterval: 10, // Removes expired sessions every 10 minutes
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        stringify: false
      }
    ),
}));
app.use(cookieParser());
app.use(express.json());
//Routes
app.use("/api/tournaments", tournamentRouter);
app.use("/api/tournaments", tournamentAnnouncementsRouter);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(blogRouter);
app.use(routerGame);
app.use(PlayerRoute);
app.use(OrganizerRoute);
app.use(SupervisorRoute);
app.use(reportsRouter);
app.use(feedbackRouter);
app.use(AuthRoute);






//Database config
connectToDB()
  .then(() => {
    console.log("Connect with DB");
    app.listen(5000, () => {
      console.log("Server started in port 5000 ");
    });
  })
  .catch((err) => console.log(err));
