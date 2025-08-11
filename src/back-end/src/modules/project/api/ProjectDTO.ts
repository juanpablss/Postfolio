import { ProjectCategory } from "@project/domain/enum/ProjectCategory";

interface CreateProjectDTO {
  name: string;
  description: string;
  category: ProjectCategory;
  githublink?: string;
  portfolioId: string;
}

interface UpdateProjectDTO {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  githublink?: string;
  portfolio: string;
}

export { CreateProjectDTO, UpdateProjectDTO };
