import Koa from "koa";
import bodyParser from "koa-bodyparser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import {config} from "./config/config";
import cors from "@koa/cors";
import postRoutes from "./routes/postRoutes";

const app = new Koa();

app.use(
  cors(
    {
    origin: "http://localhost:5173",
    credentials: true
  }
)
);

app.use(bodyParser());

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());
app.use(postRoutes.routes());
app.use(postRoutes.allowedMethods());
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

const port = config.apiGatewayPort;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
