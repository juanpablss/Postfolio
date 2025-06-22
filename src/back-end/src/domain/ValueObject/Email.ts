import validator from "validator";
import { HttpError } from "@domain/error/HttpError";

export default class Email {
  private value: string;

  constructor(email: string, requiredValidation: boolean = true) {
    if (!validator.isEmail(email) && requiredValidation)
      throw new HttpError(400, "Email inválido!");
    this.value = email;
  }

  getValue(): string {
    return this.value;
  }
}
