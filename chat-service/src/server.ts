import Koa, { Context, Next } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { ChatDataSource } from "./config/typeorm.config";
import { config } from "./config/config";
import conversationRouter from "./routes/conversationRoute";
import messageRouter from "./routes/messageRoute";
import { startMessageConsumer } from "./consumers/message.consumer";


const app = new Koa();
const router = new Router();

const PORT = config.port;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(async (ctx, next) => {
  // console.log(`Incoming: ${ctx.method} ${ctx.url}`);
  await next();
});

app.use(async (ctx: Context, next: Next) => {
  if (ctx.method === "GET" || ctx.method === "DELETE") {
    await next();
  } else {
    await bodyParser()(ctx, next);
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.use(conversationRouter.routes()).use(conversationRouter.allowedMethods());
app.use(messageRouter.routes()).use(messageRouter.allowedMethods());


const startServer = async () => {
  try {
    await ChatDataSource.initialize()
    .then(() => console.log("✅ Chat Service Database Connected"))
    .catch((err) => console.error("❌ Error connecting to Chat DB", err));
    
    await startMessageConsumer();
    console.log("Consumer booted and listening to 'messages' queue");

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`💬 Chat Service running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error during Chat Server startup", err);
  }
};
startServer();
