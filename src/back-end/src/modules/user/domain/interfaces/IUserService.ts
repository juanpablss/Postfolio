import User from "@user/domain/entities/User";
import Email from "@user/domain/valueObject/Email";
import { CreateUserDTO, LoginUserDTO, SocialLoginDTO } from "@user/api/UserDTO";

export interface IUserService {
  create(userDto: Partial<CreateUserDTO>): Promise<void>;
  deleteById(id: string): Promise<User | null>;

  login(loginDto: LoginUserDTO): Promise<string>;
  socialLogin(socialLoginDto: SocialLoginDTO): Promise<string>;

  findMany(): Promise<User[]>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
