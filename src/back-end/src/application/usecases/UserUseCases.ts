import User from "../../domain/User/User";

export default interface UserUseCases {
  register: (user: User) => Promise<void>;
  findMany: () => Promise<User[]>;
  findByEmail: (email: string | null) => Promise<User | null>;
  login: (email: string | null, passWord: string | null) => Promise<string>;
  deleteById: (id: number) => Promise<User | null>;
}
