import { InternalServerError } from "@shared/error/HttpError";
import { prisma } from "@infrastructure/config/Prisma";
import { Prisma } from "@prisma/client";
import { Project } from "@work/domain/entities/Project";
import { ProjectMapper } from "@work/application/ProjectMapper";
import { IProjectRepository } from "@work/domain/interfaces/IProjectRepository";
import { ProjectContract } from "@shared/contracts/ProjectContracts";

export class ProjectRepository implements IProjectRepository {
  async create(work: Project): Promise<Project> {
    try {
      const workModel = await prisma.project.create({
        data: {
          name: work.name,
          description: work.description,
          githubLink: work.githubLink,
          portfolioId: work.portfolioId,
        },
      });
      return ProjectMapper.fromPrismaToDomain(workModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel salvar o trabalho! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel salvar o trabalho!");
    }
  }

  async update(work: Project): Promise<Project> {
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
      return ProjectMapper.fromPrismaToDomain(workModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel atualizar o trabalho! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel atualizar o trabalho!");
    }
  }

  async delete(id: string): Promise<Project> {
    try {
      const workModel = await prisma.work.delete({ where: { id } });
      return ProjectMapper.fromPrismaToDomain(workModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel deletar o trabalho! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel deletar o trabalho!");
    }
  }

  async findMany(): Promise<Project[]> {
    const workModels = await prisma.work.findMany();
    return workModels.map(ProjectMapper.fromPrismaToDomain);
  }

  async findById(id: string): Promise<Project | null> {
    const workModel = await prisma.work.findUnique({
      where: {
        id,
      },
    });
    return workModel ? ProjectMapper.fromPrismaToDomain(workModel) : null;
  }

  async findByPortfolio(portfolioId: string): Promise<ProjectContract[]> {
    const workModels = await prisma.work.findMany({
      where: {
        portfolioId: portfolioId,
      },
    });
    return workModels.map(ProjectMapper.fromPrismaToContracts);
  }
}
