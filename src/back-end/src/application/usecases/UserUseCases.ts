import Portfolio from "../../domain/Entities/Portfolio/Portfolio";
import User from "../../domain/Entities/User/User";

export default interface UserUseCases {
  register(user: User): Promise<void>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findPortfolio(authorId: number): Promise<Portfolio[]>;
  login(email: string, passWord: string): Promise<string>;
  deleteById(id: number): Promise<User | null>;
}
