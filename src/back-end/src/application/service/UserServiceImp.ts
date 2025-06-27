import UserUseCases from "@application/useCases/UserUseCases";
import User from "@domain/entities/user/User";
import { Crypt } from "@util/Crypto";
import { Conflict, NotFound, Unauthorized } from "@domain/error/HttpError";
import { Token } from "@util/Token";
import { UserRepository } from "@domain/entities/user/UserRepository";
import userRepositoryImp from "@repository/userRep/UserRepositoryImp";
import Email from "@domain/valueObject/Email";

class UserServiceImp implements UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async register(user: User): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) throw new Conflict("Por favor, use outro email!");

    user.password = await Crypt.hashPassWord(user.password);

    await this.userRepository.insert(user);
  }

  async findMany(): Promise<User[]> {
    return this.userRepository.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async login(email: Email, passWord: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFound("Usuário não encontrado!");

    const checkPassWord = await Crypt.compare(passWord, user.password);

    if (!checkPassWord) throw new Unauthorized("Senha incorreta!");

    return Token.generate(user.id, user.email.getValue());
  }

  async deleteById(id: string): Promise<User | null> {
    return await this.userRepository.deleteById(id);
  }
}

const userServiceImp: UserUseCases = new UserServiceImp(userRepositoryImp);
export default userServiceImp;

// const userService: UserUseCases = new UserServiceImp();
// export default userService;
