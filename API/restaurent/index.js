import express from "express";
import { RestaurantModel } from "../../Database/allmodels";


const Router = express.Router();

Router.get("/", async (req, res) => {
    try {
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        if (restaurants.length === 0) {
            return res.json({ error: "No restaurants found in this city" });
        }
        return res.json({ restaurants });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findById(_id);

        if (!restaurant)
            return res.status(400).json({ error: "Restaurant Not Found" });

        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

Router.get("/search/:searchString", async (req, res) => {
    try {

        const { searchString } = req.params;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" },
        });

        if (!restaurants)
            return res
                .status(404)
                .json({ error: `No restaurant matched with ${searchString}` });

        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;