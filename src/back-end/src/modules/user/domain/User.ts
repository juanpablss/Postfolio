import Email from "@user/domain/Email";

export default class User {
  id: string;
  name: string;
  email: Email;
  password: string;
  status: string;

  constructor(
    id: string,
    name: string,
    email: Email,
    password: string,
    status: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status;
  }
}
