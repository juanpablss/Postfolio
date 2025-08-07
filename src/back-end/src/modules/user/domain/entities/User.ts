import { Unauthorized } from "@shared/error/HttpError";
import { Crypt } from "@shared/util/Crypto";
import Email from "@user/domain/valueObject/Email";

export default class User {
  id: string;
  name: string;
  email: Email;
  private passwordHash: string | null;
  status: string;

  constructor(
    id: string,
    name: string,
    email: Email,
    passwordHash: string | null,
    status: string = "None"
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.status = status;
  }

  public async comparePassword(password: string): Promise<boolean> {
    if (!this.passwordHash) return false;

    return await Crypt.compare(password, this.passwordHash);
  }

  public getPassword(): string | null {
    return this.passwordHash;
  }
}
