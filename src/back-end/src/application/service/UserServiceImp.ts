import UserUseCases from "../UseCases/UserUseCases";
import User from "../../Domain/Entities/User/User";
import Portfolio from "../../Domain/Entities/Portfolio/Portfolio";
import userRepository from "../../Adapters/OutBound/Repository/UserRepositoryImp";
import portfolioRepository from "../../Adapters/OutBound/Repository/PortfolioRepositoryImp";
import { Crypt } from "../../Util/Crypto";
import { HttpError } from "../../Infrastructure/Error/HttpError";
import { Token } from "../../Util/Token";

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

  async findPortfolio(authorId: string): Promise<Portfolio[]> {
    return await portfolioRepository.findByAuthor(authorId);
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
