import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";
import OwnerRoute from "./src/routes/Owner.route.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
export const app = express();
// middle_ware-implementation
const whiteList = ["http://localhost:5174", "http://localhost:5173"];
const corsOptions = {
  origin: function (origin, cb) {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else cb(new Error("not allow my cors"));
  },
  credentials: true,
  allowedHeaders: ["Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE"],
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
app.use("/api/v1/owner", OwnerRoute);
app.use(errorMiddleware);
