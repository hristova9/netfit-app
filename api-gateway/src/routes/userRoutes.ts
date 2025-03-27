import Router from "koa-router";
import { config } from "../config/config";
import HttpError from "../models/error.instance";
import { log } from "console";

const userRoutes = new Router();

const forwardRequest = async (
  serviceUrl: string,
  method: string,
  body?: object,
  ctx?: any
) => {
  try {
    console.log("Forwarding request to:", serviceUrl);
    console.log("Request method:", method);
    console.log("Request body:", body);
    const response = await fetch(serviceUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        cookie: ctx.headers.cookie || "", 
      },
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Error in forwarding request - Status:", response.status);
      const errorData = await response.json();
      console.log("Error response:", errorData);

      return errorData;
    }

    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      ctx.set("Set-Cookie", setCookieHeader);
    }

    return response.json();
  } catch (error) {
    if (error instanceof HttpError) {
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
    console.log(body);

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

userRoutes.post("/auth/logout", async (ctx) => {
  try {
    const response = await forwardRequest(
      `${config.usersServiceUrl}/auth/logout`,
      "POST",
      {},
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

userRoutes.get("/users/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users/${id}`,
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

userRoutes.put("/users/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const userData = ctx.request.body;

    if (userData) {
      const response = await forwardRequest(
        `${config.usersServiceUrl}/${id}`,
        "PUT",
        userData,
        ctx
      );
      ctx.status = 200;
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

userRoutes.delete("/users/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    const response = await forwardRequest(
      `${config.usersServiceUrl}/users/${id}`,
      "DELETE",
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

export default userRoutes;
