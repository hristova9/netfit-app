import dotenv from 'dotenv';

dotenv.config();

export const config = {
  apiGatewayPort: Number(process.env.API_GATEWAY_PORT || '3000'),
  usersServiceUrl: process.env.USERS_SERVICE_URL || "http://user-service:3001",
};
