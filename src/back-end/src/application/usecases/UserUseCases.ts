import User from "@domain/entities/user/User";
import Email from "@domain/valueObject/Email";

export default interface UserUseCases {
  register(user: User): Promise<void>;
  deleteById(id: string): Promise<User | null>;

  login(email: Email, passWord: string): Promise<string>;
  findMany(): Promise<User[]>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
