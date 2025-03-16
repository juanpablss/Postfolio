import User from "../../domain/User/User";
// import { UserRepository } from "../repository/UserRepository";
import { UserRepository } from "../../domain/User/UserRepository";
import { Crypt } from "../../util/Crypto";
import jwt from "jsonwebtoken";
import { HttpError } from "../../infrastructure/error/HttpError";
import UserUseCases from "../UseCases/UserUseCases";

export const UserServiceImp = (
  userRepository: UserRepository
): UserUseCases => ({
  register: async (user: User) => {
    const existingUser = await userRepository.findByEmail(user.email);

    if (existingUser) throw new HttpError(400, "Por favor, use outro email!");

    user.passWord = await Crypt.hashPassWord(user.passWord);

    await userRepository.insert(user);
  },
  findMany: async (): Promise<User[]> => {
    return userRepository.findMany();
  },
  findByEmail: async (email: string | null): Promise<User | null> => {
    if (!email) throw new HttpError(400, "O email é obrigatório!");

    const user = await userRepository.findByEmail(email);
    return user;
  },
  login: async (
    email: string | null,
    passWord: string | null
  ): Promise<string> => {
    if (!email) throw new HttpError(400, "O email é obrigatório!");
    if (!passWord) throw new HttpError(400, "A senha é obrigatória!");

    const user = await userRepository.findByEmail(email);

    if (!user) throw new HttpError(404, "Usuário não encontrado!");

    const checkPassWord = await Crypt.compare(passWord, user.passWord);

    if (!checkPassWord) throw new HttpError(401, "Senha incorreta!");

    try {
      const secret = process.env.JWT_SECRET || "default_secret";

      const token = jwt.sign({ id: user.id, email: user.email }, secret, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      throw new HttpError(500, "Não é possivel fazer login!");
    }
  },
  deleteById: async (id: number): Promise<User | null> => {
    return await userRepository.deleteById(id);
  },
});
