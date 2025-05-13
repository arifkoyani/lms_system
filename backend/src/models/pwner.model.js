import mongoose, { Schema } from "mongoose";
const OwnerSchema = new Schema({});

const Owner = mongoose.model("owner", OwnerSchema);
export default Owner;
