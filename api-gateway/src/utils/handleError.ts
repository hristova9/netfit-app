import { Context } from "koa";
import HttpError from "../models/error.instance";

const handleError = (ctx: Context, error: HttpError | Error | unknown) => {
  if (error instanceof HttpError) {
    ctx.status = error.status || 500;
    ctx.body = error.data || { message: "Internal Server Error" };
  } else if (error instanceof Error) {
    ctx.status = 500;
    ctx.body = { message: error.message || "Internal Server Error" };
  } else {
    ctx.status = 500;
    ctx.body = { message: "Unknown error occurred" };
  }
};

export default handleError;
