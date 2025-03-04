import { prisma } from "../config/prisma";
import { User } from "@prisma/client";
import { IUserRepository } from "./contracts/IUserRepository";

export const UserRepository: IUserRepository = {
  insert: async (
    name: string,
    email: string,
    passWord: string,
    status: string
  ): Promise<User | null> => {
    try {
      const user = prisma.user.create({
        data: {
          name,
          email,
          passWord,
          status,
        },
      });
      return user;
    } catch (error) {}
    return null;
  },
  findMany: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },
  findById: async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id } });
  },
  findByEmail: async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
  },
  deleteById: async (id: number): Promise<User | null> => {
    try {
      const userDelete = await prisma.user.delete({
        where: { id },
      });
      return userDelete;
    } catch (error) {
      console.log(`Erro: ${error}`);
      return null;
    }
  },
};
