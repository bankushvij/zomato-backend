require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import ConnectDB from "./Database/connections.js";
import googleAuthConfig from "./Config/google.config.js";
import privateRouteConfig from "./Config/route.config,js";
import passport from "passport";


import Image from "./API/image/index.js";
import auth from "./API/auth/index.js";
import restaurents from "./API/restaurent/index.js";
import food from "./API/food/index.js";
import menu from "./API/menu/index.js";
import review from "./API/review/index.js";
import user from "./API/user/index.js";
import order from "./API/order/index.js";

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
  