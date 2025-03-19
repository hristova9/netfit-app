import { JSONSchemaType } from "ajv";
import { IUser, IUserRegister } from "../models/user.model";

export const userValidationSchema: JSONSchemaType<IUser> = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      nullable: true,
      minLength: 6,
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$",
    },
    age: { type: "integer", nullable: true },
    isAdmin: { type: "boolean" },
  },
  additionalProperties: false,
  required: ["id", "firstName", "lastName", "email", "isAdmin"],
};

export const createUserValidationSchema: JSONSchemaType<IUserRegister> = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: {
      type: "string",
      minLength: 6,
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$",
    },
    isAdmin: { type: "boolean" },
  },
  additionalProperties: false,
  required: ["firstName", "lastName", "email", "password"],
};
