import PrismaUser from "@models/PrismaUser";
import { prisma } from "@infrastructure/config/Prisma";
import { InternalServerError } from "@domain/error/HttpError";

export class PrismaUserRepository {
  async insert(prismaUser: PrismaUser): Promise<PrismaUser> {
    try {
      const user = prisma.user.create({
        data: {
          name: prismaUser.name,
          email: prismaUser.email,
          password: prismaUser.password,
          status: prismaUser.status,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerError("Erro ao registrar usuario!");
    }
  }

  async findMany(): Promise<PrismaUser[]> {
    return await prisma.user.findMany();
  }

  async findById(id: string): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async deleteById(id: string): Promise<PrismaUser | null> {
    try {
      const userDelete = await prisma.user.delete({
        where: { id },
      });
      return userDelete;
    } catch (error) {
      throw new InternalServerError("Não foi possivel deletar usuario!");
    }
  }
}

const prismaUserRepository = new PrismaUserRepository();
export default prismaUserRepository;
