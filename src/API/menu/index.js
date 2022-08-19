import express from "express";

// Database modal
import { MenuModel, ImageModel } from "../../database/allmodels";

const Router = express.Router();

Router.get("/list/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const menus = await MenuModel.findById(_id);
  
      if (!menus) {
        res.status(404).json({ error: "No menu present for this restaurant" });
      }
  
      return res.json({ menus });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  Router.get("/image/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const menuImages = await ImageModel.findOne(_id);
  
      //TODO: vaildate if the images are present or not, throw error if not present
  
      return res.json({ menuImages });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  export default Router;