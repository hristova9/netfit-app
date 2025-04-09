import { JSONSchemaType } from "ajv";
import { IPost } from "../models/post.model";

export const postValidationSchema: JSONSchemaType<IPost> = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    description: { type: "string", minLength: 1 },
    photo: { type: "string", nullable: true },
    createdAt: { type: "string", format: "date-time" },
    ownerId: { type: "string", format: "uuid" },
  },
  additionalProperties: false,
  required: [
    "id",
    "description",
    "createdAt",
    "ownerId",
  ],
};
