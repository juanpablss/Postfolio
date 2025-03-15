export default class Portflio {
  id: number;
  name: string;
  description: string;
  pageLink: string;
  authorId: number;

  constructor(
    id: number,
    name: string,
    description: string,
    pageLink: string,
    authorId: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.pageLink = pageLink;
    this.authorId = authorId;
  }
}
