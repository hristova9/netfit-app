import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { User } from "./entities/user.entity";
import { UserDataSource } from "./config/typeorm.config";
// import { connectRabbitMQ } from "./services/rabbitmq";
import bcryptjs from "bcryptjs";
import { userRouter } from "./routes/userRoutes";
import cors from "@koa/cors";
import authRouter from "./routes/authRoutes";

const app = new Koa();
const router = new Router();

const PORT = process.env.USER_PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true
  })
);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(authRouter.routes()).use(authRouter.allowedMethods());

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

const createAdminUser = async () => {
  const userRepository = UserDataSource.getRepository(User);

  const adminUser = await userRepository.findOneBy({ firstName: "Admin" });

  if (!adminUser) {
    const admin = new User();
    admin.firstName = "Admin";
    admin.email = "admin@example.com";
    admin.password = await bcryptjs.hash("adminpassword", 10);
    admin.lastName = "User";
    admin.isAdmin = true;

    await userRepository.save(admin);
    console.log("✅ Default Admin user created!");
  }
};

const startServer = async () => {
  
  try {
    await UserDataSource.initialize()
    .then(() => console.log("✅ User Service Database Connected"))
    .catch((err) => console.error("❌ Error connecting to User DB", err));

    await createAdminUser();

    // await connectRabbitMQ();

    app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Error during server startup", err);
  }
};

startServer();
