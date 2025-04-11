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
        "X-Logged-In-User-Id": ctx.state.user?.id || "",
      },
      credentials: "include",
    };

    if (body && method !== "GET" && method !== "DELETE") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(serviceUrl, options);
    if (response.status === 204) {
      return { status: 204 };
    }

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorData;

      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        const text = await response.text();
        errorData = { message: text };
      }
    
      throw new HttpError(response.status, errorData, errorData.message || "Request failed");
    }

    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      ctx.set("Set-Cookie", setCookieHeader);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      throw new HttpError(500, { message: "Internal Service Error" }, "");
    }
  }
};

export default forwardRequest;
