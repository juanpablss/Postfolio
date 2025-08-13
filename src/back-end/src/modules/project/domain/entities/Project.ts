import { UpdateProjectDTO } from "@project/api/ProjectDTO";
import { ProjectCategory } from "@project/domain/enum/ProjectCategory";

export class Project {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private category: ProjectCategory,
    private portfolioId: string,
    private githubLink: string | null = null
  ) {}

  // Atualização seletiva
  public update(dto: UpdateProjectDTO) {
    if (dto.name !== undefined) {
      this.name = dto.name;
    }

    if (dto.description !== undefined) {
      this.description = dto.description;
    }

    if (dto.category !== undefined) {
      this.category = dto.category;
    }

    if (dto.githublink !== undefined) {
      this.githubLink = dto.githublink;
    }
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCategory(): ProjectCategory {
    return this.category;
  }

  public getPortfolioId(): string {
    return this.portfolioId;
  }

  public getGithubLink(): string | null {
    return this.githubLink;
  }
}
