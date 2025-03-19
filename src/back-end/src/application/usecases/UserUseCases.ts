import Portfolio from "../../domain/Entities/Portfolio/Portfolio";
import User from "../../domain/Entities/User/User";

export default interface UserUseCases {
  register(user: User): Promise<void>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findPortfolio(authorId: string): Promise<Portfolio[]>;
  login(email: string, passWord: string): Promise<string>;
  deleteById(id: string): Promise<User | null>;
}
