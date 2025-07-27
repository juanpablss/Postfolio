import { WebSocket } from "ws";
import { IUsersConnects } from "@chat/service/IUsersConnects";
import { injectable } from "inversify";
import { RedisClientType } from "redis";
import { DataCache } from "@infrastructure/config/Redis";

@injectable()
class UsersConnects implements IUsersConnects {
  private redisClient: RedisClientType;
  private readonly CACHE_TTL_SECONDS = 60 * 5; // 5 minutos

  constructor() {
    this.redisClient = DataCache.getInstance().getClient();
  }

  async connection(userId: string, socket: WebSocket): Promise<void> {
    const data = JSON.stringify({
      readState: socket.readyState,
    });
    await this.redisClient.set(userId, data, { EX: this.CACHE_TTL_SECONDS });
  }

  async getConnection(userId: string): Promise<WebSocket | null> {
    const socket = await this.redisClient.get(userId);

    if (!socket) return null;
  }

  deleteConnection(userId: string): Promise<true> {
    throw new Error("Method not implemented.");
  }
}
