import validator from "validator";
import { HttpError } from "../../Infrastructure/Error/HttpError";

export default class Email {
  private value: string;

  constructor(email: string) {
    if (!validator.isEmail(email)) throw new HttpError(400, "Email inválido!");
    this.value = email;
  }

  getValue(): string {
    return this.value;
  }
}
