import Router from "koa-router";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { IUserLogin, IUserRegister } from "../models/user.model";
import {
  createUserValidationSchema,
  loginUserValidationSchema,
} from "../controllers/user.validation-shema";
import { validator } from "../middlewares/validatorMiddleware";
import { createUser, getUserByEmail } from "../services/user.service";
import { checkUserCredentials } from "../services/auth.service";
import {
  addToBlacklist,
  isTokenBlacklisted,
} from "../services/blacklist.service";

const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post(
  "/register",
  validator(createUserValidationSchema),
  async (ctx) => {
    try {
      const body = ctx.request.body as IUserRegister;
      const newUser = await createUser(body);

      ctx.status = 201;
      ctx.body = {
        message: "User registered successfully",
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      };
    } catch (err) {
      if (err instanceof Error) {
        ctx.throw(400, err.message);
        console.error(`Error during registration: ${err.message}`);
      } else {
        console.error("Unexpected error occurred during registration:", err);
        ctx.throw(
          500,
          "An unexpected error occurred during registration. Please try again later."
        );
      }
    }
  }
);

authRouter.post("/login", validator(loginUserValidationSchema), async (ctx) => {
  const body = ctx.request.body as IUserLogin;

  try {
    const isValidUser = await checkUserCredentials(body.email, body.password);

    if (!isValidUser) {
      ctx.status = 401;
      ctx.body = { error: "Invalid email or password." };
      return;
    }

    const user = await getUserByEmail(body.email);
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    ctx.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
    });

    ctx.status = 200;
    ctx.body = { message: "Login successful" };
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(400, err.message);
      console.error(`Error during login: ${err.message}`);
    } else {
      console.error("Unexpected error occurred during login:", err);
      ctx.throw(
        500,
        "An unexpected error occurred during login. Please try again later."
      );
    }
  }
});

authRouter.post("/logout", async (ctx) => {
  const token = ctx.cookies.get("token");

  if (!token) {
    ctx.status = 400;
    ctx.body = { error: "No token provided" };
    return;
  }

  try {
    const isBlacklisted = await isTokenBlacklisted(token);

    if (isBlacklisted) {
      ctx.status = 400;
      ctx.body = { error: "Token is already logged out (blacklisted)" };
      return;
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    if (expiresIn > 0) {
      await addToBlacklist(token, expiresIn);
    }

    ctx.cookies.set("token", "", { expires: new Date(0) });
    ctx.status = 200;
    ctx.body = { message: "Logged out successfully" };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: "Invalid token" };
  }
});

/**
 * Protected Route - Example (Only Authenticated Users)
 */
// authRouter.get("/profile", authMiddleware, async (ctx) => {
//   ctx.body = { message: "User profile", user: ctx.state.user };
// });

export default authRouter;
