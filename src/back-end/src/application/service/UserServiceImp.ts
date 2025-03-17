import User from "../../domain/User/User";
import { Crypt } from "../../util/Crypto";
import { HttpError } from "../../infrastructure/error/HttpError";
import UserUseCases from "../UseCases/UserUseCases";
import { Token } from "../../util/Token";
import userRepository from "../../adapters/repository/UserRepositoryImp";

class UserServiceImp implements UserUseCases {
  async register(user: User): Promise<void> {
    const existingUser = await userRepository.findByEmail(
      user.email.getValue()
    );

    if (existingUser) throw new HttpError(400, "Por favor, use outro email!");

    user.passWord = await Crypt.hashPassWord(user.passWord);

    await userRepository.insert(user);
  }

  async findById(id: number): Promise<User | null> {
    return await userRepository.findById(id);
  }

  async findMany(): Promise<User[]> {
    return userRepository.findMany();
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await userRepository.findByEmail(email);
    return user;
  }
  async login(email: string, passWord: string): Promise<string> {
    const user = await userRepository.findByEmail(email);

    if (!user) throw new HttpError(404, "Usuário não encontrado!");

    const checkPassWord = await Crypt.compare(passWord, user.passWord);

    if (!checkPassWord) throw new HttpError(401, "Senha incorreta!");

    return Token.generate(user.id, user.email.getValue());
  }
  async deleteById(id: number): Promise<User | null> {
    return await userRepository.deleteById(id);
  }
}

const userService: UserUseCases = new UserServiceImp();
export default userService;
