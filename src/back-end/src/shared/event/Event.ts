import EventEmitter from "events";

const eventEmitter = new EventEmitter();

eventEmitter.on(
  EventTypes.CreateUserEvent,
  async (data: CreateUserEventData) => {
    console.log("");
  }
);
