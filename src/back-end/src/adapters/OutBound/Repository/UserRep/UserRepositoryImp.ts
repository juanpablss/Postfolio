import User from "@domain/entities/user/User";
import { UserRepository } from "@domain/entities/user/UserRepository";
import prismaUserRepository, {
  PrismaUserRepository,
} from "@repository/userRep/PrismaUserRepository";
import Mapper from "@util/Mapper";
import Email from "@domain/valueObject/Email";

export class UserRepositoryImp implements UserRepository {
  constructor(private readonly prismaUserRepository: PrismaUserRepository) {}

  async insert(user: User): Promise<User | null> {
    const userModel = Mapper.User.toPrisma(user);
    return Mapper.User.toDomain(
      await this.prismaUserRepository.insert(userModel)
    );
  }

  async findMany(): Promise<User[]> {
    const userModels = await this.prismaUserRepository.findMany();

    const users = userModels.map(Mapper.User.toDomain);

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const userModel = await this.prismaUserRepository.findById(id);
    if (!userModel) return null;
    return Mapper.User.toDomain(userModel);
  }
  async findByEmail(email: Email): Promise<User | null> {
    const userModel = await this.prismaUserRepository.findByEmail(
      email.getValue()
    );
    if (!userModel) return null;
    return Mapper.User.toDomain(userModel);
  }
  async deleteById(id: string): Promise<User | null> {
    const userModel = await this.prismaUserRepository.deleteById(id);
    if (!userModel) return null;
    return Mapper.User.toDomain(userModel);
  }
}
const userRepositoryImp = new UserRepositoryImp(prismaUserRepository);
export default userRepositoryImp;

// const userRepository: UserRepository = new UserRepositoryImp();
// export default userRepository;
