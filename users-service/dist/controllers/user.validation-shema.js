"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidationSchema = exports.createUserValidationSchema = exports.userValidationSchema = void 0;
exports.userValidationSchema = {
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
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,}$",
        },
        description: { type: "string", nullable: true },
        age: { type: "integer", nullable: true },
        isAdmin: { type: "boolean" },
        avatar: { type: "string", nullable: true }, // Optional field (will be handled in the backend)
        cover: { type: "string", nullable: true },
    },
    additionalProperties: false,
    required: ["id", "firstName", "lastName", "email", "isAdmin"],
};
exports.createUserValidationSchema = {
    type: "object",
    properties: {
        firstName: { type: "string", minLength: 2 },
        lastName: { type: "string", minLength: 2 },
        email: { type: "string", format: "email" },
        password: {
            type: "string",
            minLength: 8,
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$",
        },
        isAdmin: { type: "boolean", nullable: true, default: false },
    },
    additionalProperties: false,
    required: ["firstName", "lastName", "email", "password"],
};
exports.loginUserValidationSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: {
            type: "string",
            minLength: 8,
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$",
        },
    },
    additionalProperties: false,
    required: ["email", "password"],
};
