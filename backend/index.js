import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize"
import UsersRoute from "./routes/UsersRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import ReservationRoute from "./routes/ReservationRoute.js"
import AuthRoute from "./routes/AuthRoute.js"

dotenv.config();


const app = express();

const sessionStore= SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
})


//INICIALIZAR LA BD

// (async () => {
//     await db.sync();
// })();

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json());
app.use(UsersRoute);
app.use(RoleRoute);
app.use(ReservationRoute);
app.use(AuthRoute);

// store.sync();
app.listen(process.env.APP_PORT , ()=>{
    console.log(`Server up and running ${process.env.APP_PORT}....`)
})