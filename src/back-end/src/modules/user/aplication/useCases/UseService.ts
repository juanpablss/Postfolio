import User from "@user/domain/entities/User";
import { Crypt } from "@shared/util/Crypto";
import {
  Conflict,
  InternalServerError,
  NotFound,
  Unauthorized,
} from "@shared/error/HttpError";
import { Token } from "@shared/util/Token";
import IUserRepository from "@user/domain/ports/IUserRepository";
import Email from "@user/domain/valueObject/Email";
import { CreateUserDTO, LoginUserDTO } from "@user/aplication/dtos/UserDTO";
import Mapper from "@shared/util/Mapper";
import IUserUseCases from "@user/aplication/ports/IUserUseCases";
import { IPortfolioService } from "@user/infra/outBound/ports/IPortfolioService";

export default class UserServiceImp implements IUserUseCases {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly portfolioService: IPortfolioService
  ) {}

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

    const user = await this.userRepository.create(userDomain);

    if (!user)
      throw new InternalServerError("Não foi possivel salver o usuario");
    // Configurar melhor depois
    await this.portfolioService.createDefaultPortfolioForUser(user.id);
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
