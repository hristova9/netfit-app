import Router from "koa-router";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/user.service";
import { IUser } from "../models/user.model";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRouter = new Router({
  prefix: "/users",
});

userRouter.get("/", async (ctx) => {
  try {
    const users = await getAllUsers();
    ctx.status = 200;
    ctx.body = users;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(404, error.message);
    } else {
      ctx.throw(
        500,
        "An error occurred while retrieving users. Please try again later."
      );
    }
  }
});

userRouter.get("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const user = await getUserById(id);
    ctx.body = user;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(404, error.message);
    } else {
      ctx.throw(
        500,
        "An error occurred while retrieving user. Please try again later."
      );
    }
  }
});

userRouter.put("/:id", async (ctx) => {
  const { id } = ctx.params;
  const body = ctx.request.body as IUser;

  try {
    const updatedUser = await updateUser(id, body as IUser);
    ctx.body = updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(
        500,
        "An error occurred while updating user. Please try again later."
      );
    }
  }
});

userRouter.delete("/:id", authMiddleware, async (ctx) => {
  try {
    const { id } = ctx.params;
    await deleteUserById(id);
    ctx.status = 204;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(404, error.message);
    } else {
      ctx.throw(
        500,
        "An error occurred while deleting user. Please try again later."
      );
    }
  }
});
