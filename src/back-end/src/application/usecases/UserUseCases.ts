import Portfolio from "../../Domain/Entities/Portfolio/Portfolio";
// import Rating from "../../Domain/Entities/Rating/Rating";
import User from "../../Domain/Entities/User/User";

export default interface UserUseCases {
  register(user: User): Promise<void>;
  login(email: string, passWord: string): Promise<string>;

  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;

  findPortfolio(authorId: string): Promise<Portfolio[]>;

  // createReting(rating: Rating): Promise<Rating>;
  // findManyRating(id: string): Promise<Rating[]>;

  deleteById(id: string): Promise<User | null>;
}
