import User from "@domain/entities/user/User";
import Email from "@domain/valueObject/Email";
import { CreateUserDTO, LoginUserDTO } from "@dtos/UserDTO";

export default interface UserUseCases {
  register(userDto: Partial<CreateUserDTO>): Promise<void>;
  deleteById(id: string): Promise<User | null>;

  login(loginDto: Partial<LoginUserDTO>): Promise<string>;
  findMany(): Promise<User[]>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
