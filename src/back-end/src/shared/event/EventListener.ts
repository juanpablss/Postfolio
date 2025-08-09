// Contrato para criação de um evento.
export abstract class Event {
  public static ID: string;

  public abstract getID(): string;
}

// Contrato para criação de um handler.
export interface EventHandler<T extends Event> {
  handle(event: T): Promise<void>;
  getEventId(): string;
}

// Renderizador global.
export class EventListener {
  private static handlers: Map<string, EventHandler<Event>[]> = new Map();

  public static subscribeHandler<T extends Event>(
    eventHandler: EventHandler<T>
  ) {
    if (!this.handlers.has(eventHandler.getEventId())) {
      this.handlers.set(eventHandler.getEventId(), []);
    }

    this.handlers.get(eventHandler.getEventId())?.push(eventHandler);
  }
  public static async publish<T extends Event>(event: T) {
    const handlers = this.handlers.get(event.getID());

    if (handlers) {
      const promises = handlers.map((handler) => handler.handle(event));
      Promise.all(promises).catch((error) => {
        // Importante: tratamos erros aqui para evitar UnhandledPromiseRejection
        console.error(
          `[EventListener] Erro ao processar evento ${event.getID()}:`,
          error
        );
      });
    }
  }
}
