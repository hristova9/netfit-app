import Router from "koa-router";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../services/user.service";
import { validator } from "../middlewares/validatorMiddleware";
import {
  createUserValidationSchema,
  userValidationSchema,
} from "../controllers/user.validation-shema";
import { IUser, IUserRegister } from "../models/user.model";
// import { createUser } from "../repositories/user.repository";

export const userRouter = new Router({
  prefix: "/users",
});

userRouter.get("/", async (ctx) => {
  try {
    const users = await getAllUsers();
    ctx.status = 200;
    ctx.body = users;
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(404, err.message);
    } else {
      ctx.status = 500;
      ctx.body = {
        error:
          "An error occurred while retrieving users. Please try again later.",
      };
    }
  }
});

userRouter.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  const user = await getUserById(id);
  if (!user) {
    ctx.throw(404, "User not found");
  }
  ctx.body = user;
});

// userRouter.post("/", async (ctx) => {
//   try {
//     const body = ctx.request.body as IUserRegister;
//     const newUser = await createUser(body);

//     ctx.status = 201;
//     ctx.body = {
//       id: newUser.id,
//       firstName: newUser.firstName,
//       lastName: newUser.lastName,
//       email: newUser.email,
//     };
//   } catch (err) {
//     console.log("post");
    
//     if (err instanceof Error) {
//       ctx.throw(400, err.message);
//       console.error("Error occurred:", err);
//     } else {
//       console.error("Error:", err);
//       ctx.throw(500, "Unknown error");
//     }
//   }
// });

userRouter.put("/:id", async (ctx) => {
  // userRouter.put("/:id", validator(userValidationSchema), async (ctx) => {
  const { id } = ctx.params;
  const userId = ctx.state.user?.id;
  const body = ctx.request.body as IUser;

  // if (!userId) {
  //   ctx.throw(401, "Unauthorized: User not authenticated");
  // }

  // if (id.toString() !== userId.toString()) {
  //   ctx.throw(403, "Forbidden: You can only update your own account");
  // }

  try {
    const updatedUser = await updateUser(id, body as IUser);
    ctx.body = updatedUser;
  } catch (error) {
    console.error("Update User Error:", error);
    ctx.throw(400, "Failed to update user");
  }
});

userRouter.delete("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    // if (ctx.state.user.id !== id) {
    //   ctx.throw(403, "Forbidden: You can only delete your own account");
    // }

    await deleteUserById(id);
    ctx.status = 204;
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(404, err.message);
    } else {
      ctx.throw(500, "Unknown error");
    }
  }
});
