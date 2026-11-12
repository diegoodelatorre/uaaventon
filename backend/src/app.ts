import dotenv from "dotenv";
import { Server } from "./server.js";
import { AppRoutes } from "./routes/index.js";
import sequelize from "./conf/db.js";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const server = new Server({ port, routes: AppRoutes.router });

async function main() {
  try {
    if (process.env.NODE_ENV !== "test") {
      await sequelize.authenticate();
      console.log("Database connection established successfully via Sequelize.");
      server.start();
    }
  } catch (e) {
    console.error("Unable to connect to the database:", e);
    process.exit(1);
  }
}

main();

export default server.app;