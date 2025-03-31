import Router from "koa-router";
import { config } from "../config/config";
import HttpError from "../models/error.instance";
import authMiddleware from "../middlewares/authMiddleware";
import blacklistService  from '../services/blacklist.service';

const userRoutes = new Router();

const forwardRequest = async (
  serviceUrl: string,
  method: string,
  body?: object,
  ctx?: any
) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        cookie: ctx.headers.cookie || "",
      },
      credentials: "include",
    };

    if (body && method !== "GET" && method !== "DELETE") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(serviceUrl, options);
    if (response.status === 204) {
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      ctx.set("Set-Cookie", setCookieHeader);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      console.error("Forward request error:", error);
      throw error;
    } else {
      throw new HttpError(500, { message: "Internal Service Error" }, "");
    }
  }
};

userRoutes.post("/auth/register", async (ctx) => {
  try {
    const body = ctx.request.body;
    if (body) {
      const response = await forwardRequest(
        `${config.usersServiceUrl}/auth/register`,
        "POST",
        body,
        ctx
      );
      ctx.status = 201;
      ctx.body = response;
    }
  } catch (error) {
    if (error instanceof HttpError) {
      ctx.status = error.status || 500;
      ctx.body = error.data || { message: "Internal Server Error" };
    } else if (error instanceof Error) {
      ctx.status = 500;
      ctx.body = { message: error.message || "Internal Server Error" };
    }
  }
});

userRoutes.post("/auth/login", async (ctx) => {
  try {
    const body = ctx.request.body;
    if (body) {
      console.log("yes");

      const response = await forwardRequest(
        `${config.usersServiceUrl}/auth/login`,
        "POST",
        body,
        ctx
      );
      ctx.status = 201;
      ctx.body = response;
    }
  } catch (error) {
    if (error instanceof HttpError) {
      ctx.status = error.status || 500;
      ctx.body = error.data || { message: "Internal Server Error" };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error" };
    }
  }
});

userRoutes.post("/auth/logout",authMiddleware, async (ctx) => {
  const token = ctx.cookies.get('token');
  try {
    const response = await forwardRequest(
      `${config.usersServiceUrl}/auth/logout`,
      "POST",
      {},
      ctx
    );
    ctx.status = 200;
    ctx.body = await response;
    if(response.status === 204 && token ){
      const expiresIn = 3600;
      await blacklistService.addToBlacklist(token, expiresIn);
    }
  } catch (error) {
    if (error instanceof HttpError) {
      ctx.status = error.status || 500;
      ctx.body = error.data || { message: "Internal Server Error" };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error" };
    }
  }
});

userRoutes.get("/auth/validate-token", authMiddleware, async (ctx) => {
  if(ctx.status === 401){
    ctx.body = {message: "Unauthorized"}
    return false;
  }
  ctx.body = { message: "Token is valid", user: ctx.state.user }
});

userRoutes.get("/users", async (ctx) => {
  try {
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users`,
      "GET",
      ctx
    );

    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    if (error instanceof HttpError) {
      ctx.status = error.status || 500;
      ctx.body = error.data || { message: "Internal Server Error" };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error" };
    }
  }
});

userRoutes.get("/users/me", authMiddleware, async (ctx) => {
  const user = ctx.state.user;

  if (!user.id) {
    ctx.status = 400;
    ctx.body = { error: "User ID not found in token" };
    return;
  }

  try {
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users/${user.id}`,
      "GET",
      undefined,
      ctx
    );
    ctx.status = 200;
    ctx.body = response;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to fetch user data" };
  }
});

userRoutes.put("/users/:id", authMiddleware, async (ctx) => {
  try {
    const { id } = ctx.params;
    const userData = ctx.request.body;

    if (userData) {
      const response = await forwardRequest(
        `${config.usersServiceUrl}/users/${id}`,
        "PUT",
        userData,
        ctx
      );
      ctx.status = 200;
      ctx.body = await response;
    }
  } catch (error) {
    if (error instanceof HttpError) {
      ctx.status = error.status || 500;
      ctx.body = error.message ;
    } else {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error" };
    }
  }
});

userRoutes.delete("/users/:id", async (ctx) => {
  
  try {
    const { id } = ctx.params;
    console.log("Deleting user with ID:", id);
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users/${id}`,
      "DELETE",
      undefined,
      ctx
    );

    if (response?.status === 204) {
      ctx.status = 204;
      ctx.body = { message: "User deleted successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Failed to delete user" };
    }
  } catch (error) {
    if (error instanceof HttpError) {
      ctx.status = error.status || 500;
      ctx.body = error.message;
    } else {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error" };
    }
  }
});

export default userRoutes;
