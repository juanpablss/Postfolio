export class Work {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public githubLink: string | null,
    public portfolioId: string
  ) {}
}
