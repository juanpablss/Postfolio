import { User as UserModel } from "@prisma/client";
import { CreateUserDTO } from "@user/dtos/UserDTO";
import User from "@user/domain/entities/User";
import Email from "@user/domain/valueObject/Email";

export const UserMapper = {
  fromPrismatoDomain(prismaUser: UserModel): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      new Email(prismaUser.email, false),
      prismaUser.password,
      prismaUser.status
    );
  },
  fromDomaintoPrisma(user: User): UserModel {
    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
      password: user.password,
      status: user.status,
    };
  },
  fromCreateUserDTOtoDomain(dto: CreateUserDTO, hashedPassword: string): User {
    return new User(
      "",
      dto.name,
      new Email(dto.email),
      hashedPassword,
      dto.status
    );
  },
};
