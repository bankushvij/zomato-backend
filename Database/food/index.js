import mongoose, { Mongoose } from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isVeg: { type: Boolean, required: true },
  isContainsEgg: { type: Boolean, required: true },
  category: { type: String, required: true },
  photos: { type: mongoose.Types.ObjectId, ref: "Images" },
  restaurent: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurent",
    required: true,
  },
  price: { type: Number, default: 150, required: true },
  addons: [{ type: mongoose.Types.ObjectId, ref: "Foods" }],
});

export const FoodModel = mongoose.models['Food'] || mongoose.model("Food", FoodSchema);
// {
// "name":"pizza",
// "desciption":"Authentic pizaa with 2x toppings",
// "isVeg":false,
// "isContainsEgg":false,
// "photos":"62c827d83109de54701c672e",
// "restaurent":"62c6d9b29f350fe1abc3c5d2",
// "price":"500",


// }
