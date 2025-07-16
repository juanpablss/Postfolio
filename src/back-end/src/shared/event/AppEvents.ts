export interface UserCreatedEventData {
  userId: string;
  name: string;
  email: string;
}

export interface IUserCreatedEventHandler {
  emit(data: UserCreatedEventData): Promise<string>;
}

class UserCreatedEventEmitter {
  private handlers: IUserCreatedEventHandler[] = [];

  add(handler: IUserCreatedEventHandler) {
    this.handlers.push(handler);
  }

  async emit(data: UserCreatedEventData) {
    for (const handler of this.handlers) {
      const result = await handler.emit(data);
      console.log(result);
    }
  }
}

// Evento exportado com instância funcional
export const AppEvents = {
  userCreated: new UserCreatedEventEmitter(),
};
