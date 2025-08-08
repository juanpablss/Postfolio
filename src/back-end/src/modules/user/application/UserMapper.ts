import { User as UserModel } from "@prisma/client";
import { CreateUserDTO, SocialLoginDTO } from "@user/api/UserDTO";
import User from "@user/domain/entities/User";
import Email from "@user/domain/valueObject/Email";

export const UserMapper = {
  fromPrismatoDomain(prismaUser: UserModel): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      new Email(prismaUser.email, false),
      prismaUser.password,
      prismaUser.bio,
      prismaUser.linkedin,
      prismaUser.github,
      prismaUser.website,
      prismaUser.status
    );
  },
  fromDomaintoPrisma(user: User): UserModel {
    return {
      id: user.id,
      name: user.username,
      email: user.email.getValue(),
      password: user.getPassword(),
      bio: user.bio,
      linkedin: user.linkedin,
      github: user.github,
      website: user.website,
      status: user.status,
    };
  },
  fromCreateUserDTOtoDomain(dto: CreateUserDTO, hashedPassword: string): User {
    return new User(
      "",
      dto.username,
      new Email(dto.email),
      hashedPassword,
      dto.bio,
      dto.linkedin,
      dto.github,
      dto.website,
      dto.status
    );
  },
  fromSocialLoginDTOtoDomain(dto: SocialLoginDTO): User {
    return new User("", dto.name, new Email(dto.email, false), null);
  },
};
