import User from "./User";

export interface UserRepository {
  insert: (user: User) => Promise<User | null>;
  findMany: () => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}
