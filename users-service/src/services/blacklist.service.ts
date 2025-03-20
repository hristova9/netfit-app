import Redis from "ioredis";

// Connect to Redis using default or custom configuration
const redisClient = new Redis({
    host: process.env.REDIS_HOST || "redis",  // Use the Docker service name as the host
    port: Number(process.env.REDIS_PORT) || 6379,
});

// Add token to blacklist with an expiration time
export const addToBlacklist = async (token: string, expiresIn: number) => {
  await redisClient.set(`blacklist:${token}`, "invalid", "EX", expiresIn);
};

// Check if token is blacklisted
export const isTokenBlacklisted = async (token: string) => {
  const result = await redisClient.get(`blacklist:${token}`);
  return result !== null;
};

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});
