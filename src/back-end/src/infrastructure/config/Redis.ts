import { createClient, RedisClientType } from "redis";

class DataCache {
  private redisClient: RedisClientType;

  // Make the constructor private to enforce Singleton pattern
  public constructor() {
    this.redisClient = createClient({
      username: "default",
      password: process.env.DATACACHE_REDIS,
      socket: {
        host: "redis-11379.c99.us-east-1-4.ec2.redns.redis-cloud.com",
        port: 11379,
      },
    });

    // Handle connection errors
    this.redisClient.on("error", (err) =>
      console.error("Redis Client Error", err)
    );
    this.redisClient.on("connect", () =>
      console.log("Redis Client Connected!")
    );
    this.redisClient.on("end", () => console.log("Redis Client Disconnected!"));
  }

  public async connect(): Promise<void> {
    if (!this.redisClient.isReady) {
      // Check if it's not already connected/connecting
      await this.redisClient
        .connect()
        .then(() => console.log("Redis connected!"))
        .catch((err) => console.error("Redis connection failed:", err));
    }
  }

  /**
   * Returns the connected Redis client.
   * Ensure connect() has been called and awaited before calling this.
   */
  public getClient(): RedisClientType {
    return this.redisClient;
  }

  // Optional: Add a disconnect method
  public async disconnect(): Promise<void> {
    if (this.redisClient.isReady) {
      await this.redisClient.quit(); // Use quit() for graceful shutdown
    }
  }
}

export { DataCache }; // Export the class
