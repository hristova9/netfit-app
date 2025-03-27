import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
});

const addToBlacklist = async (token: string, expiresIn: number) => {
  await redisClient.set(`blacklist:${token}`, "invalid", "EX", expiresIn);
};

const isTokenBlacklisted = async (token: string) => {
  const result = await redisClient.get(`blacklist:${token}`);
  return result !== null;
};

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

export default { addToBlacklist, isTokenBlacklisted };
