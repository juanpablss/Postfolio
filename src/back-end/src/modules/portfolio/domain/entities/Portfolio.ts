export class WorkData {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public githubLink: string | null,
    public portfolioId: string
  ) {}
}
export class Portfolio {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public pageLink: string | null,
    public authorId: string,
    public works?: WorkData[]
  ) {}
}
