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
const imageValidationMiddleware_1 = require("../middlewares/imageValidationMiddleware");
// interface UploadedFile extends Express.Multer.File {
//   buffer: Buffer;
// }
// // Extend Koa's Context to correctly handle the files object
// interface ExtendedContext extends Context {
//   request: Context['request'] & {
//     files: { [key: string]: File[] | undefined };  // Generalize the files structure
//     body: any;
//   };
// }
exports.userRouter = new koa_router_1.default({
    prefix: "/users",
});
exports.userRouter.get("/", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        ctx.status = 200;
        ctx.body = users;
    }
    catch (error) {
        if (error instanceof Error) {
            ctx.throw(404, error.message);
        }
        else {
            ctx.throw(500, "An error occurred while retrieving users. Please try again later.");
        }
    }
}));
exports.userRouter.get("/:id", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = ctx.params;
        console.log(id);
        console.log(ctx.state.user);
        // if(id === "me"){
        //   id = ctx.state.user;
        // }
        const user = yield (0, user_service_1.getUserById)(id);
        ctx.body = user;
    }
    catch (error) {
        if (error instanceof Error) {
            ctx.throw(404, error.message);
        }
        else {
            ctx.throw(500, "An error occurred while retrieving user. Please try again later.");
        }
    }
}));
exports.userRouter.put("/:id", imageValidationMiddleware_1.uploadImageMiddleware, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = ctx.params;
    const body = ctx.request.body;
    const files = ctx.request.files;
    try {
        const updatedUser = yield (0, user_service_1.updateUser)(id, body, files);
        ctx.body = updatedUser;
    }
    catch (error) {
        if (error instanceof Error) {
            ctx.throw(400, error.message);
        }
        else {
            ctx.throw(500, "An error occurred while updating user. Please try again later.");
        }
    }
}));
exports.userRouter.delete("/:id", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = ctx.params;
        yield (0, user_service_1.deleteUserById)(id);
        ctx.status = 204;
    }
    catch (error) {
        if (error instanceof Error) {
            ctx.throw(404, error.message);
        }
        else {
            ctx.throw(500, "An error occurred while deleting user. Please try again later.");
        }
    }
}));
