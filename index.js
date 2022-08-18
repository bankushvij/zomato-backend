require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import ConnectDB from "./database/connections";
import googleAuthConfig from "./config/google.config";
import privateRouteConfig from "./config/route.config";
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


zomato.use("/auth",auth)
zomato.use("/image",Image)
zomato.use("/restaurent",restaurents)
zomato.use("/food",food)
zomato.use("/menu",menu);
zomato.use("/order",order);
zomato.use("/review",review);
zomato.use("/user",user);
zomato.use(passport.session());



zomato.listen(4000, () => {
    ConnectDB()
      .then(() => {
        console.log("Server is running !!!");
      })
      .catch((error) => {
        console.log("Server is running, but database connection failed...");
        console.log(error);
      });
  });
  