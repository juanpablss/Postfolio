export default class User {
  id: number;
  name: string;
  email: string;
  passWord: string;
  status: string;

  constructor(
    id: number,
    name: string,
    email: string,
    passWord: string,
    status: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passWord = passWord;
    this.status = status;
  }
}
