import {
  ProjectCategory as ProjectCategoryModel,
  Project as ProjectModel,
} from "@prisma/client";
import { Project } from "@project/domain/entities/Project";
import { CreateWorkDTO, UpdateWorkDTO } from "@project/api/ProjectDTO";
import { ProjectContract } from "@shared/contracts/ProjectContracts";
import { ProjectCategory } from "@project/domain/enum/ProjectCategory";

export const ProjectCategoryMapper = {
  fromPrismaToDomain(prismaCategory: ProjectCategoryModel): ProjectCategory {
    switch (prismaCategory) {
      case ProjectCategoryModel.FULLSTACK:
        return ProjectCategory.FULLSTACK;
      case ProjectCategoryModel.FRONTEND:
        return ProjectCategory.FRONTEND;
      case ProjectCategoryModel.BACKEND:
        return ProjectCategory.BACKEND;
      case ProjectCategoryModel.DESIGN:
        return ProjectCategory.DESIGN;
      case ProjectCategoryModel.MOBILE:
        return ProjectCategory.MOBILE;
      case ProjectCategoryModel.DATA_ANALYSIS:
        return ProjectCategory.DATA_ANALYSIS;
      case ProjectCategoryModel.OTHER:
        return ProjectCategory.OTHER;
      default:
        throw new Error(
          `Categoria de projeto inválida do Prisma: ${prismaCategory}`
        );
    }
  },
  fromDomainToPrisma(domainCategory: ProjectCategory): ProjectCategoryModel {
    switch (domainCategory) {
      case ProjectCategory.FULLSTACK:
        return ProjectCategoryModel.FULLSTACK;
      case ProjectCategory.FRONTEND:
        return ProjectCategoryModel.FRONTEND;
      case ProjectCategory.BACKEND:
        return ProjectCategoryModel.BACKEND;
      case ProjectCategory.DESIGN:
        return ProjectCategoryModel.DESIGN;
      case ProjectCategory.MOBILE:
        return ProjectCategoryModel.MOBILE;
      case ProjectCategory.DATA_ANALYSIS:
        return ProjectCategoryModel.DATA_ANALYSIS;
      case ProjectCategory.OTHER:
        return ProjectCategoryModel.OTHER;
      default:
        throw new Error(
          `Categoria de projeto inválida do domínio: ${domainCategory}`
        );
    }
  },
};

export const ProjectMapper = {
  fromPrismaToDomain(projectModel: ProjectModel): Project {
    return new Project(
      projectModel.id,
      projectModel.name,
      projectModel.description,
      ProjectCategoryMapper.fromPrismaToDomain(projectModel.category),
      projectModel.githublink,
      projectModel.portfolioId
    );
  },
  fromPrismaToContracts(projectModel: ProjectModel): ProjectContract {
    return {
      id: projectModel.id,
      name: projectModel.name,
      description: projectModel.description,
      category: ProjectCategoryMapper.fromPrismaToDomain(projectModel.category),
      githubLink: projectModel.githublink,
      portfolioId: projectModel.portfolioId,
    };
  },
  fromDomainToPrisma(project: Project): ProjectModel {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      category: ProjectCategoryMapper.fromDomainToPrisma(project.category),
      githublink: project.githubLink,
      portfolioId: project.portfolioId,
    };
  },
  fromCreateWorkDtoToDomain(dto: CreateWorkDTO): Project {
    return new Project(
      "",
      dto.name,
      dto.description,
      dto.category,
      dto.githublink,
      dto.portfolioId
    );
  },
  fromUpdateWorkDtoToDomain(dto: UpdateWorkDTO): Project {
    return new Project(
      dto.id,
      dto.name,
      dto.description,
      dto.category,
      dto.githublink,
      dto.portfolio
    );
  },
};
