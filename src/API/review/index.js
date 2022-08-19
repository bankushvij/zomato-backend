import express from "express";
import passport from "passport";

// Database Model
import { ReviewModel } from "../../database/allmodels";

const Router = express.Router();


Router.get("/:resid", async (req, res) => {
    try {
      const { resid } = req.params;
      const reviews = await ReviewModel.find({ restaurants: resid });
      
      if(reviews.length===0)
      {
        return res.json({ error: "No review found in this" });
      }
      return res.json({ reviews });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });


  Router.delete("/delete/:id", async (req, res) => {
    try {
      const { _id } = req.params;
  
      await ReviewModel.findByIdAndDelete(_id);
  
      return res.json({ review: "Sucessfully deleted the review." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  export default Router;
  