import { createClient } from "redis";

const redis = createClient();

redis.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}

connectRedis();

export default redis;
