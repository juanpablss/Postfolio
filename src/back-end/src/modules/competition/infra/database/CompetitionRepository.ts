import { InternalServerError } from "@shared/error/HttpError";
import { prisma } from "@infrastructure/config/Prisma";
import { Prisma } from "@prisma/client";
import { Competition } from "@competition/domain/entities/Competition";
import { CompetitionMapper } from "@competition/application/CompetitionMapper";
import { ICompetitionRepository } from "@competition/domain/interfaces/ICompetitionRepository";
Competition;

export class PrismaCompetitionRepository implements ICompetitionRepository {
  async create(competition: Competition): Promise<Competition> {
    try {
      const competitionModel = await prisma.competition.create({
        data: {
          name: competition.name,
          createdAt: competition.createdAt,
          startsAt: competition.startsAt,
          endsAt: competition.endsAt,
        },
      });
      return CompetitionMapper.toDomain(competitionModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel salvar a competição! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel salvar a competição!");
    }
  }

  async update(competition: Competition): Promise<Competition> {
    try {
      const competitionModel = await prisma.competition.update({
        where: {
          id: competition.id,
        },
        data: {
          name: competition.name,
          createdAt: competition.createdAt,
          startsAt: competition.startsAt,
          endsAt: competition.endsAt,
        },
      });
      return CompetitionMapper.toDomain(competitionModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel atualizar a competição! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel atualizar a competição!");
    }
  }

  async deleteById(id: string): Promise<Competition | null> {
    try {
      const competitionModel = await prisma.competition.delete({
        where: {
          id,
        },
      });
      return CompetitionMapper.toDomain(competitionModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerError(
          `Não foi possivel deletar a competição! Código: ${error.code}`
        );
      }
      throw new InternalServerError("Não foi possivel deletar a competição!");
    }
  }

  async findMany(): Promise<Competition[]> {
    const competitionModels = await prisma.competition.findMany();
    return competitionModels.map(CompetitionMapper.toDomain);
  }

  async findById(id: string): Promise<Competition | null> {
    const competitionModel = await prisma.competition.findUnique({
      where: {
        id,
      },
    });

    return competitionModel
      ? CompetitionMapper.toDomain(competitionModel)
      : null;
  }

  // async createProjectCompDetails(
  //   workCompDetails: WorkCompDetails
  // ): Promise<WorkCompDetails> {
  //   try {
  //     const detailsModel = await prisma.projectCompDetails.create({
  //       data: {
  //         totalReviewers: workCompDetails.totalReviewers,
  //         totalScore: workCompDetails.totalScore,
  //         competitionId: workCompDetails.competitionId,
  //         projectId: workCompDetails.workId,
  //       },
  //     });

  //     return WorkCompDetailsMapper.toDomain(detailsModel);
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       throw new InternalServerError(
  //         `Não foi possivel salvar o workCompDetais! Código: ${error.code}`
  //       );
  //     }
  //     throw new InternalServerError(
  //       "Não foi possivel salvar o workCompDetais!"
  //     );
  //   }
  // }

  // async updateWorkCompDetails(
  //   workCompDetails: WorkCompDetails
  // ): Promise<WorkCompDetails> {
  //   try {
  //     const detailsModel = await prisma.workCompDetails.update({
  //       where: {
  //         id: workCompDetails.id,
  //       },
  //       data: {
  //         totalReviewers: workCompDetails.totalReviewers,
  //         totalScore: workCompDetails.totalScore,
  //       },
  //     });

  //     return WorkCompDetailsMapper.toDomain(detailsModel);
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       throw new InternalServerError(
  //         `Não foi possivel atualizar o workCompDetais! Código: ${error.code}`
  //       );
  //     }
  //     throw new InternalServerError(
  //       "Não foi possivel atualizar o workCompDetais!"
  //     );
  //   }
  // }

  // async deleteWorkCompDetails(id: string): Promise<WorkCompDetails | null> {
  //   try {
  //     const detailsModel = await prisma.workCompDetails.delete({
  //       where: {
  //         id,
  //       },
  //       include: {
  //         rating: true,
  //       },
  //     });

  //     return WorkCompDetailsMapper.toDomain(detailsModel);
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       throw new InternalServerError(
  //         `Não foi possivel deletar o workCompDetais! Código: ${error.code}`
  //       );
  //     }
  //     throw new InternalServerError(
  //       "Não foi possivel deletar o workCompDetais!"
  //     );
  //   }
  // }

  // async findWorkCompDetails(
  //   competitionId: string,
  //   workId: string
  // ): Promise<WorkCompDetails | null> {
  //   try {
  //     const detailsModel = await prisma.workCompDetails.findUnique({
  //       where: {
  //         competitionId_workId: {
  //           competitionId,
  //           workId,
  //         },
  //       },
  //     });
  //     return detailsModel ? WorkCompDetailsMapper.toDomain(detailsModel) : null;
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       throw new InternalServerError(
  //         `Não foi possivel efetuar a busca do workCompDetais! Código: ${error.code}`
  //       );
  //     }
  //     throw new InternalServerError(
  //       "Não foi possivel efetuar a busca do workCompDetais!"
  //     );
  //   }
  // }

  // async findWorkCompDetailsByCompetition(
  //   competitionId: string
  // ): Promise<WorkCompDetails[]> {
  //   try {
  //     const detailsModels = await prisma.workCompDetails.findMany({
  //       where: {
  //         competitionId,
  //       },
  //       include: {
  //         work: true,
  //       },
  //     });

  //     return detailsModels.map(WorkCompDetailsMapper.toDomain);
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       throw new InternalServerError(
  //         `Não foi possivel efetuar a busca do workCompDetais! Código: ${error.code}`
  //       );
  //     }
  //     throw new InternalServerError(
  //       "Não foi possivel efetuar a busca do workCompDetais!"
  //     );
  //   }
  // }

  // async findWorkCompDetailsById(id: string): Promise<WorkCompDetails | null> {
  //   throw new Error("Method not implemented.");
  // }

  // async findWorkCompDetailsByIdWihtRatings(
  //   id: string
  // ): Promise<WorkCompDetails[]> {
  //   try {
  //     const detailsModels = await prisma.workCompDetails.findMany({
  //       where: {
  //         id,
  //       },
  //       include: {
  //         rating: true,
  //       },
  //     });

  //     return detailsModels.map(WorkCompDetailsMapper.toDomain);
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       throw new InternalServerError(
  //         `Não foi possivel efetuar a busca do workCompDetais! Código: ${error.code}`
  //       );
  //     }
  //     throw new InternalServerError(
  //       "Não foi possivel efetuar a busca do workCompDetais!"
  //     );
  //   }
  // }
}
