import express, { Application } from "express";
import cors from "cors";
import { Controller } from "./shared/models";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.set("strictQuery", true);
class App {
  public express: Application;
  public port: number;

  constructor(port: number, controllers: Controller[]) {
    this.express = express();
    this.port = port;

    this.connectDB();
    this.initializeMiddleWare();
    this.initializeControllers(controllers);
  }

  private initializeMiddleWare(): void {
    this.express.use(cors());
    this.express.use(express.json({ limit: "50mb" }));
  }
  private async connectDB() {
    const url = String(process.env.CONNECTION_URL);
    try {
      const connection = await mongoose.connect(url);
      console.log(
        `MongoDB Connected: ${connection.connection.host}`.cyan.underline
      );
    } catch (error) {
      console.log(`Error MongoDB Connection: ${error}`.red.underline.bold);
      process.exit(1);
    }
  }
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.express.use(`/api/${controller.name}`, controller.route);
    });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`server listening on port: ${this.port}`.yellow.bold);
    });
  }
}

export default App;
