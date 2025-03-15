import PrismaUser from "../adapters/entities/PrismaUser";
import User from "../domain/User/User";

export const Mapper = {
  toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.passWord,
      prismaUser.status
    );
  },
  toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passWord: user.passWord,
      status: user.status,
    };
  },
};
