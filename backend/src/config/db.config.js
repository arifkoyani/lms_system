import mongoose from "mongoose";
import chalk from "chalk";
async function ConnectionDb() {
  const MONGODB_URL = process.env.MONGODB_URL;
  const DB_NAME = process.env.DB_NAME;
  try {
    const connectInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
    console.log(
      chalk.bgGreen.bold(
        "This is Connecttion Host : ",
        connectInstance.connection.host
      )
    );
    console.log(
      chalk.bgCyan.bold(
        "This is connecttion Port :",
        connectInstance.connection.port
      )
    );
  } catch (error) {
    console.log("FAIL TO CONNECT TO DB");
  }
}
export default ConnectionDb;
