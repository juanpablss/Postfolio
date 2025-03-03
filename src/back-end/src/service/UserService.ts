import { User } from "@prisma/client";
import { UserModel } from "../model/UserModel";
import bcrypt from "bcrypt";

export const UserService = {
  validateRegister: async (
    name: string,
    email: string,
    passWord: string,
    status: string
  ) => {
    if (!name) {
      throw new Error("O nome é obrigatório!");
    }

    if (!email) {
      throw new Error("O email é obrigatório!");
    }

    if (!passWord) {
      throw new Error("A senha é obrigatória!");
    }

    if (!status) {
      throw new Error("O status é obrigatório!");
    }

    const user = await UserModel.findByEmail(email);

    if (user) {
      throw new Error("Por favor, use outro email!");
    }
  },
  validateLogin: async (email: string, passWord: string): Promise<User> => {
    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const checkPassWord = await bcrypt.compare(passWord, user.passWord);

    if (!checkPassWord) {
      throw new Error("Senha incorreta!");
    }
    return user;
  },
  hashPassWord: async (passWord: string): Promise<string> => {
    const saltRounds = 12;
    const hashPassWord = await bcrypt.hash(passWord, saltRounds);

    return hashPassWord;
  },
};
