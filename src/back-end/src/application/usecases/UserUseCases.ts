import User from "../../domain/User/User";

export default interface UserUseCases {
  register(user: User): Promise<void>;
  findById(id: number): Promise<User | null>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  login(email: string, passWord: string): Promise<string>;
  deleteById(id: number): Promise<User | null>;
}
