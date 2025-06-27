import { InternalServerError } from "@domain/error/HttpError";
import { prisma } from "@infrastructure/config/Prisma";
import PrismaCompetition from "@models/PrismaCompetition";
import { Prisma } from "@prisma/client";

export class PrismaCompetitionRepository {
  async inserte(
    prismaCompetition: PrismaCompetition
  ): Promise<PrismaCompetition> {
    try {
      return await prisma.competition.create({
        data: {
          name: prismaCompetition.name,
          createdAt: prismaCompetition.createdAt,
          startsAt: prismaCompetition.startsAt,
          endsAt: prismaCompetition.endsAt,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel salvar a competição! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel salvar a competição!");
    }
  }

  async findById(id: string): Promise<PrismaCompetition | null> {
    return await prisma.competition.findUnique({
      where: {
        id,
      },
    });
  }

  async findMany(): Promise<PrismaCompetition[]> {
    return await prisma.competition.findMany();
  }

  async update(
    prismaCompetition: PrismaCompetition
  ): Promise<PrismaCompetition> {
    try {
      return await prisma.competition.update({
        where: {
          id: prismaCompetition.id,
        },
        data: {
          name: prismaCompetition.name,
          createdAt: prismaCompetition.createdAt,
          startsAt: prismaCompetition.startsAt,
          endsAt: prismaCompetition.endsAt,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel atualizar a competição! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel atualizar a competição!");
    }
  }

  async delete(id: string): Promise<PrismaCompetition | null> {
    try {
      return await prisma.competition.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel deletar a competição! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel deletar a competição!");
    }
  }
}

const prismaCompetitionRepository = new PrismaCompetitionRepository();
export default prismaCompetitionRepository;
