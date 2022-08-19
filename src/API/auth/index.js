import express from "express";
import { UserModel } from "../../Database/allmodels";
import passport from "passport";


const Router = express.Router();
import { ValidateSignin, ValidateSignup } from "../../Validation/auth";


Router.post("/signup", async (req, res) => {
  try {
    // await ValidateSignup(req.body.credentials);
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.post("/signin", async (req, res) => {
  try {
    // await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get(
  "/google",
  passport.authenticate("google", 
  {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect(
      `http://localhost:3000/google/${req.session.passport.user.token}`
    )
  }
);

























// Router.post("/signup", async (req, res) => {
//   try {
//     const { email, password, fullName, phoneNumber } = req.body.credentials;
//     const checkUserByEmail = await UserModel.findOne({ email });
//     const checkUserByPhone = await UserModel.findOne({ phoneNumber });

//     if (checkUserByEmail || checkUserByPhone) {
//       return res.json({ user: "User already exists!" });
//     }

//     // hash password
//     const bcryptSalt = await bcrypt.genSalt(8);
//     const hashedPassword = await bcrypt.hash(password, bcryptSalt);

//     // save data to database
//     await UserModel.create({
//       ...req.body.credentials,
//       password: hashedPassword,
//     });

//     //generate JWT auth token (package name is jsonwebtoken)
//     const token = jwt.sign({ user: { fullName, email } }, "ZomatoApp");

//     return res.status(200).json({ token, status: "success" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });


export default Router;