import { User as UserModel, UserType as UserTypeModel } from "@prisma/client";
import { CreateUserDTO, SocialLoginDTO } from "@user/api/UserDTO";
import User from "@user/domain/entities/User";
import { UserType } from "@user/domain/enum/UserType";
import Email from "@user/domain/valueObject/Email";

export const UserTypeMapper = {
  fromPrismaToDomain(userType: UserTypeModel): UserType {
    switch (userType) {
      case UserTypeModel.DEVELOPER:
        return UserType.DEVELOPER;
      case UserTypeModel.EMPLOYER:
        return UserType.EMPLOYER;
    }
  },
  fromDomainToPrisma(userType: UserType): UserTypeModel {
    switch (userType) {
      case UserType.DEVELOPER:
        return UserTypeModel.DEVELOPER;
      case UserType.EMPLOYER:
        return UserTypeModel.EMPLOYER;
    }
  },
};

export const UserMapper = {
  fromPrismaToDomain(prismaUser: UserModel): User {
    return new User(
      prismaUser.id,
      prismaUser.username,
      new Email(prismaUser.email, false),
      prismaUser.password,
      prismaUser.bio,
      prismaUser.linkedin,
      prismaUser.github,
      prismaUser.website,
      UserTypeMapper.fromPrismaToDomain(prismaUser.userType)
    );
  },
  fromDomaintoPrisma(user: User): UserModel {
    return {
      id: user.id,
      username: user.username,
      email: user.email.getValue(),
      password: user.getPassword(),
      bio: user.bio,
      linkedin: user.linkedin,
      github: user.github,
      website: user.website,
      userType: UserTypeMapper.fromDomainToPrisma(user.userType),
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
      dto.userType
    );
  },
  fromSocialLoginDTOtoDomain(dto: SocialLoginDTO): User {
    return new User("", dto.name, new Email(dto.email, false), null);
  },
};
