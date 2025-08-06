import { Event } from "@shared/event/EventListener";

export class UserCreatedEvent extends Event {
  static {
    this.ID = "CREATED_USER";
  }

  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public readonly userEmail: string
  ) {
    super();
  }

  public getID(): string {
    return UserCreatedEvent.ID;
  }
}
