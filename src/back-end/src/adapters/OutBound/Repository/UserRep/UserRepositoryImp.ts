import User from "../../../../domain/entities/user/User";
import PrismaUser from "../../entities/PrismaUser";
import { UserRepository } from "../../../../domain/entities/user/UserRepository";
import { PrismaUserRepository } from "./PrismaUserRepository";
import Mapper from "../../../../Util/Mapper";

class UserRepositoryImp implements UserRepository {
  async insert(user: User): Promise<User | null> {
    const userEntity: PrismaUser = Mapper.User.toPrisma(user);
    return Mapper.User.toDomain(await PrismaUserRepository.insert(userEntity));
  }

  async findMany(): Promise<User[]> {
    const usersEntity = PrismaUserRepository.findMany();

    const users = (await usersEntity).map(Mapper.User.toDomain);

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await PrismaUserRepository.findById(id);
    if (!userEntity) return null;
    return Mapper.User.toDomain(userEntity);
  }
  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await PrismaUserRepository.findByEmail(email);
    if (!userEntity) return null;
    return Mapper.User.toDomain(userEntity);
  }
  async deleteById(id: string): Promise<User | null> {
    const userEntity = await PrismaUserRepository.deleteById(id);
    if (!userEntity) return null;
    return Mapper.User.toDomain(userEntity);
  }
}

const userRepository: UserRepository = new UserRepositoryImp();
export default userRepository;
