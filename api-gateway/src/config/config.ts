import dotenv from 'dotenv';

dotenv.config();

export const config = {
  apiGatewayPort: Number(process.env.API_GATEWAY_PORT || '3000'),
  usersServiceUrl: process.env.USERS_SERVICE_URL || "http://user-service:3001",
  postsServiceUrl: process.env.POSTS_SERVICE_URL || "http://post-service:3002",
  chatServiceUrl: process.env.CHAT_SERVICE_URL || "http://chat-service:3003",
  jwt: process.env.JWT_SECRET || "your-super-secret-key"
};
