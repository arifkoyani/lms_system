import { Router } from "express";
import {
  registerOwner,
  imageUpload,
  login,
} from "../controlers/owner/owner.controler.js";
import upload from "../middlewares/multer.middleware.js";
const OwnerRoute = Router();

OwnerRoute.route("/login").post(login);
OwnerRoute.route("/register").post(upload.single("profile"), registerOwner);
OwnerRoute.route("/upload").post(upload.single("profile"), imageUpload);
export default OwnerRoute;
