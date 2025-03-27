import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { UserDataSource } from "./config/typeorm.config";
// import { connectRabbitMQ } from "./services/rabbitmq";
import { userRouter } from "./routes/userRoutes";
import cors from "@koa/cors";
import authRouter from "./routes/authRoutes";
import { initSetup } from "./services/init.service";
import { config } from "./config/config";

const app = new Koa();
const router = new Router();

const PORT = config.user_port;

app.use(
  cors(
    {
    origin: "http://localhost:3000",
    credentials: true
  }
)
);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(authRouter.routes()).use(authRouter.allowedMethods());

const startServer = async () => {
  
  try {
    await UserDataSource.initialize()
    .then(() => console.log("✅ User Service Database Connected"))
    .catch((err) => console.error("❌ Error connecting to User DB", err));

    await initSetup();

    // await connectRabbitMQ();

    app.listen(PORT, "0.0.0.0", () => console.log(`User Service running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Error during server startup", err);
  }
};

startServer();
