import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  images: [{ location: { type: String, required: true } }],
});

export const ImageModel = mongoose.models['Images'] || mongoose.model("Images", ImageSchema);
