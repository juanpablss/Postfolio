// src/shared/eventBus.ts
import { EventEmitter } from "node:events";

// 1. Defina seus tipos de evento (enum para clareza e segurança de string)
export enum EventTypes {
  CreateUserEvent = "CREATE_USER_EVENT",
  // Adicione outros eventos globais do seu monolito aqui, ex:
  OrderPlacedEvent = "ORDER_PLACED_EVENT",
  ProductUpdatedEvent = "PRODUCT_UPDATED_EVENT",
}

// 2. Defina as interfaces de payload para cada tipo de evento
// Isso garante tipagem forte e autocomplete ao emitir e consumir
export interface EventPayloads {
  [EventTypes.CreateUserEvent]: {
    userId: string;
    name: string;
    email: string;
    // Adicione outros dados relevantes da criação do usuário
  };
  [EventTypes.OrderPlacedEvent]: {
    orderId: string;
    customerId: string;
    totalAmount: number;
  };
  [EventTypes.ProductUpdatedEvent]: {
    productId: string;
    name: string;
    price: number;
  };
}

// 3. Crie uma interface auxiliar para adicionar tipagem forte ao EventEmitter
// Isso fará com que o TypeScript entenda os tipos de payload para cada evento
interface TypedEventEmitter<T extends EventTypes> extends EventEmitter {
  // Sobrescreve o método 'emit' para garantir que o payload corresponda ao tipo de evento
  emit<K extends T>(event: K, payload: EventPayloads[K]): boolean;
  // Sobrescreve o método 'on' para garantir que o listener receba o payload correto
  on<K extends T>(
    event: K,
    listener: (payload: EventPayloads[K]) => void
  ): this;
  // Sobrescreve o método 'off' para remover listeners tipados
  off<K extends T>(
    event: K,
    listener: (payload: EventPayloads[K]) => void
  ): this;
  // Você pode adicionar outros métodos do EventEmitter que precisar, mantendo a tipagem
}

// 4. Exporte uma única instância tipada do EventEmitter para ser usada em todo o monolito
export const eventBus: TypedEventEmitter<EventTypes> = new EventEmitter();

// Opcional: Define o número máximo de listeners como 0 (ilimitado) para evitar warnings
// em ambientes com muitos módulos ou listeners.
eventBus.setMaxListeners(0);
