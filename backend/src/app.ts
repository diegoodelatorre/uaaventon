import dotenv from "dotenv";
import { Server } from "./server.js";
import { AppRoutes } from "./routes/index.js";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const server = new Server({ port, routes: AppRoutes.router });

async function main() {
  try {
    if (process.env.NODE_ENV !== "test") {
      server.start();
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main();

export default server.app;