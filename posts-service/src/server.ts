import Koa, { Context, Next } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { PostDataSource } from "./config/typeorm.config";
import cors from "@koa/cors";
import { config } from "./config/config";
import postRouter from "./routes/postRoutes";

const app = new Koa();
const router = new Router();

const PORT = config.post_port;
app.use(async (ctx, next) => {
  console.log(`Incoming: ${ctx.method} ${ctx.url}`);
  console.log(`Headers: ${JSON.stringify(ctx.request.headers)}`);
  console.log(`Body: ${JSON.stringify(ctx.request.body)}`);
  await next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(async (ctx: Context, next: Next) => {
  if (ctx.method === "GET" || ctx.method === "DELETE") {
    await next();
  } else {
    await bodyParser()(ctx, next);
  }
});
app.use(router.routes()).use(router.allowedMethods());
app.use(postRouter.routes()).use(postRouter.allowedMethods());

const startServer = async () => {
  try {
    await PostDataSource.initialize()
      .then(() => console.log("✅ Post Service Database Connected"))
      .catch((err) => console.error("❌ Error connecting to Post DB", err));

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Post Service running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error during server startup", err);
  }
};

startServer();
