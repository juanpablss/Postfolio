// src/infra/cache/DataCache.ts (ou onde você o definiu)
import { createClient, RedisClientType } from "redis";

class DataCache {
  private redisClient: RedisClientType;
  private static instance: DataCache; // A instância única

  // O construtor é PRIVADO para garantir o Singleton
  private constructor() {
    this.redisClient = createClient({
      username: "default",
      password: process.env.DATACACHE_REDIS,
      socket: {
        host: "redis-11379.c99.us-east-1-4.ec2.redns.redis-cloud.com",
        port: 11379,
      },
    });

    this.redisClient.on("error", (err) =>
      console.error("Redis Client Error", err)
    );
    this.redisClient.on("connect", () =>
      console.log("Redis Client Connected!")
    );
    this.redisClient.on("end", () => console.log("Redis Client Disconnected!"));
  }

  public static getInstance(): DataCache {
    if (!DataCache.instance) {
      DataCache.instance = new DataCache();
    }
    return DataCache.instance;
  }

  public async connect(): Promise<void> {
    if (!this.redisClient.isReady) {
      await this.redisClient
        .connect()
        .then(() => console.log("Redis connected!"))
        .catch((err) => console.error("Redis connection failed:", err));
    }
  }

  public getClient(): RedisClientType {
    return this.redisClient;
  }

  public async disconnect(): Promise<void> {
    if (this.redisClient.isReady) {
      await this.redisClient.quit();
    }
  }
}

export { DataCache };
