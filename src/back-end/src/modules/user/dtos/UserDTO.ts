interface CreateUserDTO {
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
