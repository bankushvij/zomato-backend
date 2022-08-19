import express from "express";

import multer from "multer";


const Router = express.Router();
import { ImageModel } from "../../Database/allmodels.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });

import { s3Upload } from "../../utils/s3.js";

Router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        const bucketOptions = {
            Bucket: "zomato-master-banku",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read", // Access Controll List
        }

        const uploadImage = await s3Upload(bucketOptions);

        const saveImageToDatabase = await ImageModel.create({
            images: [{ location: uploadImage.Location }],
          });
      
          return res.status(200).json(saveImageToDatabase);
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
})

Router.get("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const image = await ImageModel.findById(_id);
  
      return res.status(200).json(image);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  

export default Router;