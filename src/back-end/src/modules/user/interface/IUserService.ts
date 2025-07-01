import User from "@user/domain/User";
import Email from "@user/domain/Email";
import { CreateUserDTO, LoginUserDTO } from "@user/aplication/UserDTO";

export default interface IUserService {
  register(userDto: Partial<CreateUserDTO>): Promise<void>;
  deleteById(id: string): Promise<User | null>;

  login(loginDto: LoginUserDTO): Promise<string>;
  findMany(): Promise<User[]>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
