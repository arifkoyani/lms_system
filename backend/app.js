import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";
import OwnerRoute from "./src/routes/Owner.route.js";
export const app = express();
// middle_ware-implementation
const whiteList = [""];
const corsOptions = {
  origin: function (origin, cb) {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else cb(new Error("not allow my cors"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  Credential: true,
};
// .
// .
// .
// .
// .
// .
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/ap/vi/owner", OwnerRoute);
