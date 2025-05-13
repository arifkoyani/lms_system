import { app } from "./app.js";
import dotenv from "dotenv";
import chalk from "chalk";
import ConnectionDb from "./src/config/db.config.js";
dotenv.config();
const PORT = process.env.PORT || 3030;
ConnectionDb()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error(`server running failed due to ---->${err}`);
      }
      {
        console.log(chalk.bgBlue.bold(`server is running at por : ${PORT} `));
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
