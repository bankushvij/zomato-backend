import express from "express";

// Database modal
import { FoodModel } from "../../Database/allmodels";

const Router = express.Router();

Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.findById(_id);

        if (!foods)
            return res
                .status(404)
                .json({ error: `No food matched with ` });


        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

Router.get("/r/:_id", async (req, res) => {
    try {

        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id });


        if (!foods)
            return res
                .status(404)
                .json({ error: `No food matched with ${category}` });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

Router.get("/c/:category", async (req, res) => {
    try {

        const { category } = req.params;
        const foods = await FoodModel.find({
            category: { $regex: category, $options: "i" },
        });

        if (!foods)
            return res
                .status(404)
                .json({ error: `No food matched with ${category}` });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;