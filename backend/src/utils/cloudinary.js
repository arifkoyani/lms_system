import { v2 as cloudinary } from "cloudinary";
import CustomError from "./CustomError.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

async function uploadImage(localFilePath) {
  try {
    if (!localFilePath) {
      throw new CustomError("Image not found", 404);
    }
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    console.log(error, "clpopud");
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    throw new CustomError(error.message || "Image upload failed", 500);
  }
}

export default uploadImage;

// thi is cloudinary config file through which we can use it in our project
