import { Unauthorized } from "@shared/error/HttpError";
import { Crypt } from "@shared/util/Crypto";
import Email from "@user/domain/valueObject/Email";
import { UserType } from "@user/domain/enum/UserType";

export default class User {
  id: string;
  username: string;
  email: Email;
  private passwordHash: string | null;
  bio: string;
  linkedin: string | null;
  github: string | null;
  website: string | null;
  userType: UserType;

  constructor(
    id: string,
    username: string,
    email: Email,
    passwordHash: string | null,
    bio: string = "default",
    linkedin: string | null = null,
    github: string | null = null,
    website: string | null = null,
    userType: UserType = UserType.DEVELOPER
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.bio = bio;
    this.linkedin = linkedin;
    this.github = github;
    this.website = website;
    this.userType = userType;
  }

  public async comparePassword(password: string): Promise<boolean> {
    if (!this.passwordHash) return false;

    return await Crypt.compare(password, this.passwordHash);
  }

  public getPassword(): string | null {
    return this.passwordHash;
  }
}
