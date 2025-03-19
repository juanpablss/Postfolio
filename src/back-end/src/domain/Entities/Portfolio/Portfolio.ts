export default class Portfolio {
  id: number;
  name: string;
  description: string;
  pageLink: string;
  authorId: string;

  constructor(
    id: number,
    name: string,
    description: string,
    pageLink: string,
    authorId: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.pageLink = pageLink;
    this.authorId = authorId;
  }
}
