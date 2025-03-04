import { User } from "@prisma/client";

export interface IUserRepository {
  insert: (
    name: string,
    email: string,
    passWord: string,
    status: string
  ) => Promise<User | null>;
  findMany: () => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}
