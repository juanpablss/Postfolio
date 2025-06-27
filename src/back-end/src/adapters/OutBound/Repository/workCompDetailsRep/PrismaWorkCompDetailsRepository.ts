import { InternalServerError } from "@domain/error/HttpError";
import { prisma } from "@infrastructure/config/Prisma";
import PrismaWork from "@models/PrismaWork";
import PrismaWorkCompDetails from "@models/PrismaWorkComDetails";
import { Prisma } from "@prisma/client";

export class PrismaWorkCompDetailsRepository {
  async insert(
    prismaWorkRepository: PrismaWorkCompDetails
  ): Promise<PrismaWorkCompDetails> {
    try {
      return await prisma.workCompDetails.create({
        data: {
          totalReviewers: prismaWorkRepository.totalReviewers,
          totalScore: prismaWorkRepository.totalScore,
          competitionId: prismaWorkRepository.competitionId,
          workId: prismaWorkRepository.workId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel salvar o workCompDetais! Código: ${error.code}`
        );
      }
      throw new InternalServerError(
        "Não foi possivel salvar o workCompDetais!"
      );
    }
  }

  async findMany(): Promise<PrismaWorkCompDetails[]> {
    return await prisma.workCompDetails.findMany();
  }

  async findById(id: string): Promise<PrismaWorkCompDetails | null> {
    return await prisma.workCompDetails.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCompetition(
    competitionId: string
  ): Promise<PrismaWorkCompDetails[]> {
    return await prisma.workCompDetails.findMany({
      where: {
        competitionId,
      },
    });
  }

  async findByWork(workId: string): Promise<PrismaWorkCompDetails[]> {
    return await prisma.workCompDetails.findMany({
      where: {
        workId,
      },
    });
  }

  async findWorksByCompetition(
    competitionId: string
  ): Promise<PrismaWorkCompDetails[]> {
    return await prisma.workCompDetails.findMany({
      where: { competitionId },
      include: { work: true },
    });
  }

  async findByCompetitionAndWork(
    competitionId: string,
    workId: string
  ): Promise<PrismaWorkCompDetails | null> {
    return await prisma.workCompDetails.findUnique({
      where: {
        competitionId_workId: {
          competitionId,
          workId,
        },
      },
    });
  }

  async update(
    prismaWorkCompDetails: PrismaWorkCompDetails
  ): Promise<PrismaWorkCompDetails> {
    try {
      return await prisma.workCompDetails.update({
        where: {
          id: prismaWorkCompDetails.id,
        },
        data: {
          totalReviewers: prismaWorkCompDetails.totalReviewers,
          totalScore: prismaWorkCompDetails.totalScore,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel atualizar o workCompDetais! Código: ${error.code}`
        );
      }
      throw new InternalServerError(
        "Não foi possivel atualizar o workCompDetais!"
      );
    }
  }

  async delete(id: string): Promise<PrismaWorkCompDetails | null> {
    try {
      return await prisma.workCompDetails.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel deletar o workCompDetais! Código: ${error.code}`
        );
      }
      throw new InternalServerError(
        "Não foi possivel deletar o workCompDetais!"
      );
    }
  }
}
const prismaWorkCompDetails = new PrismaWorkCompDetailsRepository();
export default prismaWorkCompDetails;
