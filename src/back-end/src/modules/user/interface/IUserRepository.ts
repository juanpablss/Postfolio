import User from "@user/domain/User";
import Email from "@user/domain/Email";

export default interface IUserRepository {
  create: (user: User) => Promise<User | null>;
  deleteById: (id: string) => Promise<User | null>;

  findMany: () => Promise<User[]>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: Email) => Promise<User | null>;
}
