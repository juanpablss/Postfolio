import User from "@user/domain/entities/User";
import { Crypt } from "@shared/util/Crypto";
import {
  Conflict,
  InternalServerError,
  NotFound,
  Unauthorized,
} from "@shared/error/HttpError";
import { Token } from "@shared/util/Token";
import { IUserRepository } from "@user/domain/entities/IUserRepository";
import Email from "@user/domain/valueObject/Email";
import { CreateUserDTO, LoginUserDTO } from "@user/dtos/UserDTO";
import { IUserService } from "@user/service/IUserService";
import { inject, injectable } from "inversify";
import { TYPES } from "@compositionRoot/Types";
import { UserMapper } from "@user/util/UserMapper";
import { AppEvents } from "@shared/event/AppEvents";
// import { eventBus, EventTypes } from "@shared/event/EventBus";
@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async register(userDto: CreateUserDTO): Promise<void> {
    const hashedPassword = await Crypt.hashPassWord(userDto.password);
    const userDomain = UserMapper.fromCreateUserDTOtoDomain(
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
    // if (
    //   eventBus.emit(EventTypes.CreateUserEvent, {
    //     userId: user.id,
    //     name: user.name,
    //     email: user.email.getValue(),
    //   })
    // )
    //   console.log("Portfolio criado com sucesso");
    await AppEvents.userCreated.emit({
      userId: user.id,
      name: user.name,
      email: user.email.getValue(),
    });
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
