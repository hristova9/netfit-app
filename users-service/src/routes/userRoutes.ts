import Router from "koa-router";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/user.service";
import { validator } from "../middlewares/validatorMiddleware";
import {
  createUserValidationSchema,
  userValidationSchema,
} from "../controllers/user.validation-shema";
import { IUser, IUserRegister } from "../models/user.model";
import { authMiddleware } from "../middlewares/authMiddleware";
// import { createUser } from "../repositories/user.repository";

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
      ctx.throw(500, "An error occurred while retrieving users. Please try again later.");
    }
  }
});

userRouter.get("/:id", async (ctx) => {
  try{
    const { id } = ctx.params;
    console.log(id);
    
    const user = await getUserById(id);
    ctx.body = user;
  }catch (error) {
    if (error instanceof Error) {
      ctx.throw(404, error.message);
    } else {
      ctx.throw(500, "An error occurred while retrieving user. Please try again later.");
    }
  }
});

userRouter.put("/:id", authMiddleware, async (ctx) => {
  const { id } = ctx.params;
  const authenticatedUserId = ctx.state.user?.id;
  const body = ctx.request.body as IUser;

  if (!authenticatedUserId) {
    ctx.throw(401, "Unauthorized: User not authenticated");
  }

  if (id !== authenticatedUserId.toString()) {
    ctx.throw(403, "Forbidden: You can only update your own account");
  }

  try {
    const updatedUser = await updateUser(id, body as IUser);
    ctx.body = updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(400, error.message);
    } else {
      ctx.throw(500, "An error occurred while updating user. Please try again later.");
    }
    
  }
});

userRouter.delete("/:id", authMiddleware, async (ctx) => {
  
  try {
    const { id } = ctx.params;
    const authenticatedUserId = ctx.state.user?.id;

    console.log("Authenticated User ID:", authenticatedUserId)

  if (!authenticatedUserId) {
    ctx.throw(401, "Unauthorized: User not authenticated");
  }

  if (id !== authenticatedUserId.toString()) {
    ctx.throw(403, "Forbidden: You can only delete your own account");
  }

    await deleteUserById(id);
    ctx.status = 204;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(404, error.message);
    } else {
      ctx.throw(500, "An error occurred while deleting user. Please try again later.");
    }
  }
});
