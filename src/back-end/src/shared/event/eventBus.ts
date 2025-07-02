// src/shared/eventBus.ts
import { EventEmitter } from "node:events";

class AppEventEmitter extends EventEmitter {
  private static instance: AppEventEmitter;

  private constructor() {
    super();
  }

  public static getInstance(): AppEventEmitter {
    if (!AppEventEmitter.instance) {
      AppEventEmitter.instance = new AppEventEmitter();
      AppEventEmitter.instance.setMaxListeners(0);
    }
    return AppEventEmitter.instance;
  }
}

// Exporta uma instância singleton
export const eventBus = AppEventEmitter.getInstance();
