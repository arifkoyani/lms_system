import { Router } from "express";
import {
  registerOwner,
  imageUpload,
} from "../controlers/owner/owner.controler.js";
import upload from "../middlewares/multer.middleware.js";
const OwnerRoute = Router();
OwnerRoute.route("/register").post(upload.single("profile"), registerOwner);
OwnerRoute.route("/upload").post(upload.single("profile"), imageUpload);
export default OwnerRoute;
