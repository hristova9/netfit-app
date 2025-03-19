import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
// import amqp from "amqplib"; // RabbitMQ library
import { User } from "./entities/user.entity";
import { UserDataSource } from "./config/typeorm.config";
import { connectRabbitMQ } from "./services/rabbitmq";
import bcryptjs from "bcryptjs";
import { userRouter } from "./routes/userRoutes";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();

const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true
  })
);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use(userRouter.routes()).use(userRouter.allowedMethods());

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
  await UserDataSource.initialize();
  console.log("Connected to User DB");

  await createAdminUser();

  await connectRabbitMQ();
  console.log("Connected to RabbitMQ");

  app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
};

startServer();
