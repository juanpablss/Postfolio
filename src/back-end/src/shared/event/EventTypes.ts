enum EventTypes {
  CreateUserEvent = "CREATE_USER",
}

interface CreateUserEventData {
  userId: string;
  email: string;
}
