import { UpdatePortfolioDTO } from "@portfolio/api/PortfolioDTO";

export class Portfolio {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private pageLink: string | null,
    private authorId: string
  ) {}

  public update(dto: UpdatePortfolioDTO) {
    if (dto.name !== undefined) {
      this.name = dto.name;
    }

    if (dto.description !== undefined) {
      this.description = dto.description;
    }

    if (dto.pagelink !== undefined) {
      this.pageLink = dto.pagelink;
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

  public getPageLink(): string | null {
    return this.pageLink;
  }

  public getAuthorId(): string {
    return this.authorId;
  }
}
