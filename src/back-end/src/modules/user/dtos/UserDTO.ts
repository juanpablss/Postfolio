interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
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
