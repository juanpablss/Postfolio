import { InternalServerError } from "@shared/error/HttpError";
import { prisma } from "@infrastructure/config/Prisma";
import { Prisma } from "@prisma/client";
import { Work } from "@work/domain/entities/Work";
import { WorkMapper } from "@work/util/WorkMapper";
import { IWorkRepository } from "@work/domain/entities/IWorkRepository";

export class PrismaWorkRepository implements IWorkRepository {
  async create(work: Work): Promise<Work> {
    try {
      const workModel = await prisma.work.create({
        data: {
          name: work.name,
          description: work.description,
          githubLink: work.githubLink,
          portfolioId: work.portfolioId,
        },
      });
      return WorkMapper.fromPrismatoDomain(workModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel salvar o trabalho! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel salvar o trabalho!");
    }
  }

  async findMany(): Promise<Work[]> {
    const workModels = await prisma.work.findMany();
    return workModels.map(WorkMapper.fromPrismatoDomain);
  }

  async findById(id: string): Promise<Work | null> {
    const workModel = await prisma.work.findUnique({
      where: {
        id,
      },
    });
    return workModel ? WorkMapper.fromPrismatoDomain(workModel) : null;
  }

  async findByPortfolio(portfolioId: string): Promise<Work[]> {
    const workModels = await prisma.work.findMany({
      where: {
        portfolioId: portfolioId,
      },
    });
    return workModels.map(WorkMapper.fromPrismatoDomain);
  }

  async update(work: Work): Promise<Work> {
    try {
      const workModel = await prisma.work.update({
        where: {
          id: work.id,
        },
        data: {
          name: work.name,
          description: work.description,
          githubLink: work.githubLink,
        },
      });
      return WorkMapper.fromPrismatoDomain(workModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel atualizar o trabalho! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel atualizar o trabalho!");
    }
  }

  async delete(id: string): Promise<Work> {
    try {
      const workModel = await prisma.work.delete({ where: { id } });
      return WorkMapper.fromPrismatoDomain(workModel);
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
