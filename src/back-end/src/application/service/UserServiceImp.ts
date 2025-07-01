import UserUseCases from "@application/useCases/UserUseCases";
import User from "@domain/entities/user/User";
import { Crypt } from "@shared/util/Crypto";
import {
  BadRequest,
  Conflict,
  NotFound,
  Unauthorized,
} from "@domain/error/HttpError";
import { Token } from "@shared/util/Token";
import { UserRepository } from "@domain/entities/user/UserRepository";
import userRepositoryImp from "@repository/userRep/UserRepositoryImp";
import Email from "@domain/valueObject/Email";
import { CreateUserDTO, LoginUserDTO } from "@user/aplication/UserDTO";
import Mapper from "@shared/util/Mapper";

class UserServiceImp implements UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async register(userDto: CreateUserDTO): Promise<void> {
    const hashedPassword = await Crypt.hashPassWord(userDto.password);
    const userDomain = Mapper.User.fromCreateUserDTOtoDomain(
      userDto,
      hashedPassword
    );

    const existingUser = await this.userRepository.findByEmail(
      userDomain.email
    );

    if (existingUser) throw new Conflict("Por favor, use outro email!");

    await this.userRepository.insert(userDomain);
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

  async login(loginDto: LoginUserDTO): Promise<string> {
    const email = new Email(loginDto.email);

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFound("Usuário não encontrado!");

    const checkPassWord = await Crypt.compare(loginDto.password, user.password);

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
