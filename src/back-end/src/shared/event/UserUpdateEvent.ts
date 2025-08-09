import { Event } from "@shared/event/EventListener";

export class UserUpdateEvent extends Event {
  static {
    this.ID = "UPDATE_USER";
  }

  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public readonly userEmail: string
  ) {
    super();
  }

  public getID(): string {
    return UserUpdateEvent.ID;
  }
}
