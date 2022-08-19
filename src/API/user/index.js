import express from "express";
import passport from "passport";

// Database Modal
import { UserModel } from "../../Database/allmodels";

const Router = express.Router();

Router.get("/", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { email, fullName, phoneNumber, address } =
        req.session.passport.user._doc;
       
      return res.json({ user: { email, fullName, phoneNumber, address } });
    } catch {
      return res.status(500).json({ error: error.message });
    }
  });
  
Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);
        const { fullName } = getUser;

        if (!getUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ user: { fullName } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

Router.put("/update/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const { userData } = req.body;

        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: userData,
            },
            {
                new: true,
            }
        );
        return res.json({ user: updateUserData });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;