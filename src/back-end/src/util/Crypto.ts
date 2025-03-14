import bcrypt from "bcrypt";
import { HttpError } from "./error/HttpError";

export const Cryto = {
  hashPassWord: async (passWord: string): Promise<string> => {
    if (!passWord || typeof passWord !== "string")
      throw new HttpError(400, "passWord não enviada.");

    const saltRounds = 12;
    const hashPassWord = await bcrypt.hash(passWord, saltRounds);

    return hashPassWord;
  },
  compare: async (data: string, encrypted: string): Promise<boolean> => {
    if (!data || typeof data !== "string")
      throw new HttpError(500, "Não é possivel verificar senha.");

    if (!encrypted || typeof encrypted !== "string")
      throw new HttpError(500, "Não é possivel verificar senha.");

    const checkPassWord = await bcrypt.compare(data, encrypted);
    return checkPassWord;
  },
};
