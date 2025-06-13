import User from "@domain/entities/user/User";

export interface UserRepository {
  insert: (user: User) => Promise<User | null>;
  findMany: () => Promise<User[]>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  deleteById: (id: string) => Promise<User | null>;
}
