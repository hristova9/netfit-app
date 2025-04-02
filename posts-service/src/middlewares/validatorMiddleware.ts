import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { Context, Next } from 'koa';
import { IPost } from '../models/post.model';

const ajv = new Ajv();
addFormats(ajv);

export const validator = (schema: JSONSchemaType<IPost>) => async (ctx: Context, next: Next) => {
  const validate: ValidateFunction = ajv.compile(schema);
  const valid = validate(ctx.request.body);
  if (!valid) {
    ctx.throw(400, { message: validate.errors });
  }
  
  await next();
}