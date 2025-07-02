import validator from "validator";
import { BadRequest } from "@shared/error/HttpError";

export default class Email {
  private value: string;

  constructor(email: string, requiredValidation: boolean = true) {
    if (!validator.isEmail(email) && requiredValidation)
      throw new BadRequest("Email inválido!");
    this.value = email;
  }

  public getValue(): string {
    return this.value;
  }
}
