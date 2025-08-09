import { UserType } from "@user/domain/enum/UserType";

interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  bio: string;
  linkedin?: string;
  github?: string;
  website?: string;
  userType: UserType;
}

interface UpdateUserDTO {
  username: string;
  email: string;
  password: string;
  bio: string;
  linkedin?: string;
  github?: string;
  website?: string;
  status: string;
}

interface LoginUserDTO {
  email: string;
  password: string;
}

interface SocialLoginDTO {
  name: string;
  email: string;
}

export { CreateUserDTO, LoginUserDTO, SocialLoginDTO };
