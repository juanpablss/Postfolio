import { UserModel } from "../model/UserModel";

export const UserService = {
  validate: async (
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
};
