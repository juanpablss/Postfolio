import { ProjectCategory } from "@project/domain/enum/ProjectCategory";

interface CreateWorkDTO {
  name: string;
  description: string;
  category: ProjectCategory;
  githublink: string | null;
  portfolioId: string;
}

interface UpdateWorkDTO {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  githublink: string | null;
  portfolio: string;
}

export { CreateWorkDTO, UpdateWorkDTO };
