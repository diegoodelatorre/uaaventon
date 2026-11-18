import express, { Router, type Express } from "express";
import cors from "cors";

type serverOptions = {
  port: number;
  routes: Router;
};

export class Server {
  private readonly port: number;
  private readonly server: Express;
  private readonly routes: Router;

  constructor(options: serverOptions) {
    this.server = express();
    this.port = options.port;
    this.routes = options.routes;
    this.configureMiddlewares();
  }

  private configureMiddlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use("/api", this.routes);

    this.server.get("/", (_req, res) => {
      res.send("Servidor de UAAventon funcionando correctamente");
    });
  }

  public get app(): Express {
    return this.server;
  }

  public start() {
    this.server.listen(this.port, () => {
      console.log(`server running on port: ${this.port}`);
    });
  }
}