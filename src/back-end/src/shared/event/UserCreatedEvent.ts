// export interface UserCreatedEventData {
//   userId: string;
//   name: string;
//   email: string;
// }

import { Event } from "@shared/event/EventListener";

// export interface UserCreatedEventHandler {
//   handle(data: UserCreatedEventData): Promise<string>;
// }

// export class UserCreatedEventListener {
//   private handlers: UserCreatedEventHandler[] = [];

//   public subscribe(handler: UserCreatedEventHandler) {
//     this.handlers.push(handler);
//   }

//   public async publish(data: UserCreatedEventData) {
//     for (const handler of this.handlers) {
//       const result = await handler.handle(data);
//       console.log(result);
//     }
//   }
// }

export class UserCreatedEvent extends Event {
  static {
    this.ID = "CREATED_USER";
  }

  constructor(
    public readonly userId: string,
    public readonly userEmail: string
  ) {
    super();
  }

  public getId(): string {
    return UserCreatedEvent.ID;
  }
}
