import "colors";
import App from "./app";
import { Controller } from "./shared/models";
import productRoutes from "./routes/product.route";
import authRoutes from "./routes/auth.route";
import * as dotenv from "dotenv";

dotenv.config();
const controllers: Controller[] = [
  {
    name: "product",
    route: productRoutes,
  },
  {
    name: "authentification",
    route: authRoutes,
  },
];
const app = new App(Number(process.env.PORT), controllers);
app.listen();
