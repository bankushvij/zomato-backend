require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import ConnectDB from "./database/connections";
import googleAuthConfig from "./Config/google.config";
import privateRouteConfig from "./Config/route.config";
import passport from "passport";


import Image from "./API/image";
import auth from "./API/auth";
import restaurents from "./API/restaurent";
import food from "./API/food";
import menu from "./API/menu";
import review from "./API/review";
import user from "./API/user";
import order from "./API/order"

const session = require('express-session');
googleAuthConfig(passport);
privateRouteConfig(passport);



const zomato = express();

zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(session({secret: 'ssshhhhh'}));
zomato.use(passport.initialize());


zomato.use("/api/auth",auth)
zomato.use("/api/image",Image)
zomato.use("/api/restaurent",restaurents)
zomato.use("/api/food",food)
zomato.use("/api/menu",menu);
zomato.use("/api/order",order);
zomato.use("/api/review",review);
zomato.use("/api/user",user);
zomato.use(passport.session());



const PORT=process.env.PORT||4000

zomato.listen(PORT, () => {
    ConnectDB()
      .then(() => {
        console.log("Server is running !!!");
      })
      .catch((error) => {
        console.log("Server is running, but database connection failed...");
        console.log(error);
      });
  });
  