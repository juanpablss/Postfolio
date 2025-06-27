import { InternalServerError } from "@domain/error/HttpError";
import { prisma } from "@infrastructure/config/Prisma";
import PrismaWork from "@models/PrismaWork";
import { Prisma } from "@prisma/client";

export class PrismaWorkRepository {
  async insert(prismaWork: PrismaWork): Promise<PrismaWork> {
    try {
      return await prisma.work.create({
        data: {
          name: prismaWork.name,
          description: prismaWork.description,
          githubLink: prismaWork.githubLink,
          portfolioId: prismaWork.portfolioId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel salvar o trabalho! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel salvar o trabalho!");
    }
  }

  async findMany(): Promise<PrismaWork[]> {
    return await prisma.work.findMany();
  }

  async findById(id: string): Promise<PrismaWork | null> {
    return await prisma.work.findUnique({
      where: {
        id,
      },
    });
  }

  async findByPortfolio(portfolioId: string): Promise<PrismaWork[]> {
    return await prisma.work.findMany({
      where: {
        portfolioId: portfolioId,
      },
    });
  }

  async update(prismaWork: PrismaWork): Promise<PrismaWork> {
    try {
      return await prisma.work.update({
        where: {
          id: prismaWork.id,
        },
        data: {
          name: prismaWork.name,
          description: prismaWork.description,
          githubLink: prismaWork.githubLink,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel atualizar o trabalho! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel atualizar o trabalho!");
    }
  }

  async delete(id: string): Promise<PrismaWork> {
    try {
      return await prisma.work.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel deletar o trabalho! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel deletar o trabalho!");
    }
  }
}

const prismaWorkRepository = new PrismaWorkRepository();
export default prismaWorkRepository;
