import User from "@domain/entities/user/User";
import { UserRepository } from "@domain/entities/user/UserRepository";
import prismaUserRepository, {
  PrismaUserRepository,
} from "@repository/userRep/PrismaUserRepository";
import Mapper from "@shared/util/Mapper";
import Email from "@domain/valueObject/Email";

class UserRepositoryImp implements UserRepository {
  constructor(private readonly prismaUserRepository: PrismaUserRepository) {}

  async insert(user: User): Promise<User | null> {
    const userModel = Mapper.User.fromDomaintoPrisma(user);
    return Mapper.User.fromPrismatoDomain(
      await this.prismaUserRepository.insert(userModel)
    );
  }

  async findMany(): Promise<User[]> {
    const userModels = await this.prismaUserRepository.findMany();

    const users = userModels.map(Mapper.User.fromPrismatoDomain);

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const userModel = await this.prismaUserRepository.findById(id);
    if (!userModel) return null;
    return Mapper.User.fromPrismatoDomain(userModel);
  }
  async findByEmail(email: Email): Promise<User | null> {
    const userModel = await this.prismaUserRepository.findByEmail(
      email.getValue()
    );
    if (!userModel) return null;
    return Mapper.User.fromPrismatoDomain(userModel);
  }
  async deleteById(id: string): Promise<User | null> {
    const userModel = await this.prismaUserRepository.deleteById(id);
    if (!userModel) return null;
    return Mapper.User.fromPrismatoDomain(userModel);
  }
}
const userRepositoryImp = new UserRepositoryImp(prismaUserRepository);
export default userRepositoryImp;

// const userRepository: UserRepository = new UserRepositoryImp();
// export default userRepository;
