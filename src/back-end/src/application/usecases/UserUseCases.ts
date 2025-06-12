import Portfolio from "../../domain/entities/portfolio/Portfolio";
import Rating from "../../domain/entities/rating/Rating";
import User from "../../domain/entities/user/User";

export default interface UserUseCases {
  register(user: User): Promise<void>;
  login(email: string, passWord: string): Promise<string>;

  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;

  findPortfolios(authorId: string): Promise<Portfolio[]>;
  findRatings(authorId: string): Promise<Rating[]>;
  // createReting(rating: Rating): Promise<Rating>;
  // findManyRating(id: string): Promise<Rating[]>;

  deleteById(id: string): Promise<User | null>;
}
