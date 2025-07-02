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

export { CreateUserDTO, LoginUserDTO };
