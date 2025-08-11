import { ProjectCategory } from "@project/domain/enum/ProjectCategory";

export class Project {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public category: ProjectCategory,
    public portfolioId: string,
    public githubLink: string | null = null
  ) {}
}
