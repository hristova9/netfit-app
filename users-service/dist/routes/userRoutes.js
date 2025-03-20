"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const user_service_1 = require("../services/user.service");
// import { createUser } from "../repositories/user.repository";
exports.userRouter = new koa_router_1.default({
    prefix: "/users",
});
exports.userRouter.get("/", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        ctx.status = 200;
        ctx.body = users;
    }
    catch (err) {
        if (err instanceof Error) {
            ctx.throw(404, err.message);
        }
        else {
            ctx.status = 500;
            ctx.body = {
                error: "An error occurred while retrieving users. Please try again later.",
            };
        }
    }
}));
exports.userRouter.get("/:id", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = ctx.params;
    const user = yield (0, user_service_1.getUserById)(id);
    if (!user) {
        ctx.throw(404, "User not found");
    }
    ctx.body = user;
}));
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
exports.userRouter.put("/:id", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // userRouter.put("/:id", validator(userValidationSchema), async (ctx) => {
    const { id } = ctx.params;
    const userId = (_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.id;
    const body = ctx.request.body;
    // if (!userId) {
    //   ctx.throw(401, "Unauthorized: User not authenticated");
    // }
    // if (id.toString() !== userId.toString()) {
    //   ctx.throw(403, "Forbidden: You can only update your own account");
    // }
    try {
        const updatedUser = yield (0, user_service_1.updateUser)(id, body);
        ctx.body = updatedUser;
    }
    catch (error) {
        console.error("Update User Error:", error);
        ctx.throw(400, "Failed to update user");
    }
}));
exports.userRouter.delete("/:id", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = ctx.params;
        // if (ctx.state.user.id !== id) {
        //   ctx.throw(403, "Forbidden: You can only delete your own account");
        // }
        yield (0, user_service_1.deleteUserById)(id);
        ctx.status = 204;
    }
    catch (err) {
        if (err instanceof Error) {
            ctx.throw(404, err.message);
        }
        else {
            ctx.throw(500, "Unknown error");
        }
    }
}));
