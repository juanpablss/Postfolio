export class Portfolio {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public pageLink: string | null,
    public authorId: string
  ) {}
}
