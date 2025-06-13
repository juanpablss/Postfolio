import UserUseCases from "@application/useCases/UserUseCases";
import User from "@domain/entities/user/User";
import Portfolio from "@domain/entities/portfolio/Portfolio";
import userRepository from "@adapters/outBound/repository/userRep/UserRepositoryImp";
import portfolioRepository from "@adapters/outBound/repository/portfolioRep/PortfolioRepositoryImp";
import { Crypt } from "@util/Crypto";
import { HttpError } from "@infrastructure/error/HttpError";
import { Token } from "@util/Token";
import Rating from "@domain/entities/rating/Rating";
import ratingRepository from "@adapters/outBound/repository/ratingRep/RatingRepositoryImp";

class UserServiceImp implements UserUseCases {
  async register(user: User): Promise<void> {
    const existingUser = await userRepository.findByEmail(
      user.email.getValue()
    );

    if (existingUser) throw new HttpError(400, "Por favor, use outro email!");

    user.passWord = await Crypt.hashPassWord(user.passWord);

    await userRepository.insert(user);
  }

  async findMany(): Promise<User[]> {
    return userRepository.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await userRepository.findByEmail(email);
    return user;
  }

  async findPortfolios(authorId: string): Promise<Portfolio[]> {
    return await portfolioRepository.findByAuthor(authorId);
  }

  async findRatings(authorId: string): Promise<Rating[]> {
    return await ratingRepository.findByUserId(authorId);
  }

  async login(email: string, passWord: string): Promise<string> {
    const user = await userRepository.findByEmail(email);

    if (!user) throw new HttpError(404, "Usuário não encontrado!");

    const checkPassWord = await Crypt.compare(passWord, user.passWord);

    if (!checkPassWord) throw new HttpError(401, "Senha incorreta!");

    return Token.generate(user.id, user.email.getValue());
  }
  async deleteById(id: string): Promise<User | null> {
    return await userRepository.deleteById(id);
  }
}

const userService: UserUseCases = new UserServiceImp();
export default userService;
