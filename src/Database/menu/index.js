import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  menu: [
    {
      name: { type: String, required: true },
      items: [{ type: mongoose.Types.ObjectId, ref: "Foods" }],
    },
  ],
  recomended: [{ type: mongoose.Types.ObjectId, ref: "Foods", unique: true }],
});

export const MenuModel = mongoose.models['Menu'] || mongoose.model("Menu", MenuSchema);

// menu:[{"name":"Recommended"}],
// "recomended":["62cc2b242249374c506ef91a"]