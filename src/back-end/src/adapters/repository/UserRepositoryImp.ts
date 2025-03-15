import User from "../../domain/User/User";
import PrismaUser from "../entities/PrismaUser";
import { UserRepository } from "../../domain/User/UserRepository";
import { PrismaUserRepository } from "./PrismaUserRepository";
import { Mapper } from "../../util/mapper";

export default class UserRepositoryImp implements UserRepository {
  async insert(user: User): Promise<User | null> {
    const userEntity: PrismaUser = Mapper.toPrisma(user);

    return await PrismaUserRepository.insert(userEntity);
  }

  async findMany(): Promise<User[]> {
    const usersEntity = PrismaUserRepository.findMany();

    const users = (await usersEntity).map(Mapper.toDomain);

    return users;
  }

  async findById(id: number): Promise<User | null> {
    throw new Error("Function not implemented.");
  }
  async findByEmail(email: string): Promise<User | null> {
    throw new Error("Function not implemented.");
  }
  async deleteById(id: number): Promise<User | null> {
    throw new Error("Function not implemented.");
  }
}
