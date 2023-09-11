import "dotenv/config.js";
import { connect } from "mongoose";
import express from "express";
import router from "./routes/index.js";
import error_handler from "./middlewares/error_handler.js";
import not_found_handler from "./middlewares/not_found.js";
import { __dirname } from "./utils.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import inicializePassport from "./middlewares/passport.js";
import passport from "passport";

const server = express();

//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE));
server.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: process.env.LINK_DB,
      ttl: 60 * 60 * 24 * 7,
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
inicializePassport();
server.use(passport.initialize());
server.use(passport.session());
server.use(morgan("dev"));
server.use("", express.static("public"));
server.use("/img", express.static("img"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
server.use(error_handler);
server.use(not_found_handler);
//server.use('*',(req,res)=>res.status(404).send('not found'))

//database
connect(process.env.LINK_DB) //requiere mínimo un parámetro: el link de conexión (URI)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

export default server;
