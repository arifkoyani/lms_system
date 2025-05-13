import { Router } from "express";
import registerOwner from "../controlers/owner/owner.controler.js";
const OwnerRoute = Router();
OwnerRoute.route("/register").post(registerOwner);
export default OwnerRoute;
