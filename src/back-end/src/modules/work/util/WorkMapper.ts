import { Work as WorkModel } from "@prisma/client";
import { Work } from "@work/domain/entities/Work";
import { CreateWorkDTO, UpdateWorkDTO } from "@work/dtos/WorkDTO";

export const WorkMapper = {
  fromPrismatoDomain(workModel: WorkModel): Work {
    return new Work(
      workModel.id,
      workModel.name,
      workModel.description,
      workModel.githubLink,
      workModel.portfolioId
    );
  },
  fromDomaintoPrisma(work: Work): WorkModel {
    return {
      id: work.id,
      name: work.name,
      description: work.description,
      githubLink: work.githubLink,
      portfolioId: work.portfolioId,
    };
  },
  fromCreateWorkDTOtoDomain(dto: CreateWorkDTO): Work {
    return new Work(
      "",
      dto.name,
      dto.description,
      dto.githublink,
      dto.portfolio
    );
  },
  fromUpdateWorkDTOtoDomain(dto: UpdateWorkDTO): Work {
    return new Work(
      dto.id,
      dto.name,
      dto.description,
      dto.githublink,
      dto.portfolio
    );
  },
};
