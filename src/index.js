import { app } from "./server.js";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import { DB_CONFIG } from "./configs/database-config.js";

DB_CONFIG()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is on ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
