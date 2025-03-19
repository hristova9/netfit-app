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
      minLength: 8,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$",
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
      minLength: 8,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$",
    },
    isAdmin: {
      type: "boolean",
      nullable: true,
      default: false,
    },
  },
  additionalProperties: false,
  required: ["firstName", "lastName", "email", "password"],
};
