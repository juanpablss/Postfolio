import User from "../../domain/User/User";
import PrismaUser from "../entities/PrismaUser";
import { UserRepository } from "../../domain/User/UserRepository";
import { PrismaUserRepository } from "./PrismaUserRepository";
import { UserMapper } from "../../util/mapper";

class UserRepositoryImp implements UserRepository {
  async insert(user: User): Promise<User | null> {
    const userEntity: PrismaUser = UserMapper.toPrisma(user);
    // const  = await PrismaUserRepository.insert(userEntity).;
    return UserMapper.toDomain(await PrismaUserRepository.insert(userEntity));
  }

  async findMany(): Promise<User[]> {
    const usersEntity = PrismaUserRepository.findMany();

    const users = (await usersEntity).map(UserMapper.toDomain);

    return users;
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await PrismaUserRepository.findById(id);
    if (!userEntity) return null;
    return UserMapper.toDomain(userEntity);
  }
  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await PrismaUserRepository.findByEmail(email);
    if (!userEntity) return null;
    return UserMapper.toDomain(userEntity);
  }
  async deleteById(id: number): Promise<User | null> {
    const userEntity = await PrismaUserRepository.deleteById(id);
    if (!userEntity) return null;
    return UserMapper.toDomain(userEntity);
  }
}

const userRepository: UserRepository = new UserRepositoryImp();
export default userRepository;
