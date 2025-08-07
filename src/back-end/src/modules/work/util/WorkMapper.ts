import { Work as WorkModel } from "@prisma/client";
import { Work } from "@work/domain/entities/Work";
import { CreateWorkDTO, UpdateWorkDTO } from "@work/dtos/WorkDTO";
import { WorkContract } from "@shared/contracts/WorkContracts";

export const WorkMapper = {
  fromPrismaToDomain(workModel: WorkModel): Work {
    return new Work(
      workModel.id,
      workModel.name,
      workModel.description,
      workModel.githubLink,
      workModel.portfolioId
    );
  },
  fromPrismaToContracts(workModel: WorkModel): WorkContract {
    return {
      id: workModel.id,
      name: workModel.name,
      description: workModel.description,
      githubLink: workModel.githubLink,
      portfolioId: workModel.portfolioId,
    };
  },
  fromDomainToPrisma(work: Work): WorkModel {
    return {
      id: work.id,
      name: work.name,
      description: work.description,
      githubLink: work.githubLink,
      portfolioId: work.portfolioId,
    };
  },
  fromCreateWorkDtoToDomain(dto: CreateWorkDTO): Work {
    return new Work(
      "",
      dto.name,
      dto.description,
      dto.githublink,
      dto.portfolio
    );
  },
  fromUpdateWorkDtoToDomain(dto: UpdateWorkDTO): Work {
    return new Work(
      dto.id,
      dto.name,
      dto.description,
      dto.githublink,
      dto.portfolio
    );
  },
};
