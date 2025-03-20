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
const koa_router_1 = __importDefault(require("koa-router"));
const user_service_1 = require("../services/user.service");
const authRouter = new koa_router_1.default({
    prefix: "/auth",
});
authRouter.post("/register", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request Body:", ctx.request.body);
    try {
        const body = ctx.request.body;
        const newUser = yield (0, user_service_1.createUser)(body);
        ctx.status = 201;
        ctx.body = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
        };
    }
    catch (err) {
        console.log("post");
        if (err instanceof Error) {
            ctx.throw(400, err.message);
            console.error("Error occurred:", err);
        }
        else {
            console.error("Error:", err);
            ctx.throw(500, "Unknown error");
        }
    }
}));
// authRouter.post(
//   "/register",
// //   validator(createUserValidationSchema),
//   async (ctx) => {
//     console.log("🔍 Received /auth/register request:", ctx.request.body); // DEBUG LOG
//     console.log("📌 Request body:", ctx.request.body);
//     try {
//       const body = ctx.request.body as IUserRegister;
//       const newUser = await createUser(body);
//       ctx.status = 201;
//       ctx.body = {
//         message: "User registered successfully",
//         user: {
//           id: newUser.id,
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           email: newUser.email,
//         },
//       };
//     } catch (err) {
//       if (err instanceof Error) {
//         ctx.throw(400, err.message);
//         console.error(`Error during registration: ${err.message}`);
//       } else {
//         console.error("Unexpected error occurred during registration:", err);
//         ctx.throw(
//           500,
//           "An unexpected error occurred during registration. Please try again later."
//         );
//       }
//     }
//   }
// );
// authRouter.post("/login", validator(loginUserValidationSchema), async (ctx) => {
//   const body = ctx.request.body as IUserLogin;
//   try {
//     const isValidUser = await checkUserCredentials(body.email, body.password);
//     if (!isValidUser) {
//       ctx.status = 401;
//       ctx.body = { error: "Invalid email or password." };
//       return;
//     }
//     const user = await getUserByEmail(body.email);
//     if (user) {
//       const token = jwt.sign(
//         { id: user.id, email: user.email, isAdmin: user.isAdmin },
//         JWT_SECRET,
//         { expiresIn: "1h" }
//       );
//       ctx.status = 200;
//       ctx.body = { token };
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       ctx.throw(400, err.message);
//       console.error(`Error during login: ${err.message}`);
//     } else {
//       console.error("Unexpected error occurred during login:", err);
//       ctx.throw(
//         500,
//         "An unexpected error occurred during login. Please try again later."
//       );
//     }
//   }
// });
/**
 * Protected Route - Example (Only Authenticated Users)
 */
// authRouter.get("/profile", authMiddleware, async (ctx) => {
//   ctx.body = { message: "User profile", user: ctx.state.user };
// });
exports.default = authRouter;
