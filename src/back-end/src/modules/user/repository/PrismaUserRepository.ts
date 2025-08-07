// import PrismaUser from "@models/PrismaUser";
import User from "@user/domain/entities/User";
import { prisma } from "@infrastructure/config/Prisma";
import { InternalServerError } from "@shared/error/HttpError";
import { Prisma } from "@prisma/client";
import { UserMapper } from "@user/util/UserMapper";
import { IUserRepository } from "@user/domain/entities/IUserRepository";
import Email from "@user/domain/valueObject/Email";

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
      const userModel = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email.getValue(),
          password: user.getPassword(),
          status: user.status,
        },
      });
      return UserMapper.fromPrismatoDomain(userModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel salvar o usuario! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Erro ao registrar usuario!");
    }
  }

  async findMany(): Promise<User[]> {
    const userModels = await prisma.user.findMany();
    return userModels.map(UserMapper.fromPrismatoDomain);
  }

  async findById(id: string): Promise<User | null> {
    const userModel = await prisma.user.findUnique({ where: { id } });
    return userModel ? UserMapper.fromPrismatoDomain(userModel) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userModel = await prisma.user.findUnique({
      where: { email: email.getValue() },
    });
    return userModel ? UserMapper.fromPrismatoDomain(userModel) : null;
  }

  async deleteById(id: string): Promise<User | null> {
    try {
      const userModel = await prisma.user.delete({
        where: { id },
      });
      return userModel ? UserMapper.fromPrismatoDomain(userModel) : null;
    } catch (error) {
      throw new InternalServerError("Não foi possivel deletar usuario!");
    }
  }
}
