import { Context } from "koa";
import HttpError from "../../models/error.instance";

const forwardRequest = async (
  serviceUrl: string,
  method: string,
  ctx: Context,
  body?: object
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

export default forwardRequest;
