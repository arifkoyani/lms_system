import { Router } from "express";
import {
  registerOwner,
  imageUpload,
  refresh,
  login,
} from "../controlers/owner/owner.controler.js";
import upload from "../middlewares/multer.middleware.js";
const OwnerRoute = Router();

OwnerRoute.route("/login").post(login); //thi is user login data
OwnerRoute.route("/register").post(upload.single("profile"), registerOwner);
OwnerRoute.route("/upload").post(upload.single("profile"), imageUpload);
OwnerRoute.route("/refresh").get(refresh);
export default OwnerRoute;
