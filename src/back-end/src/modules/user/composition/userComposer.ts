import { Container } from "inversify";
import { TYPES } from "@compositionRoot/Types";

import { IUserRepository } from "@user/domain/entities/IUserRepository";
import { IUserService } from "@user/service/IUserService";
import { IUserPort } from "@user/api/IUserPort";

import { PrismaUserRepository } from "@user/repository/PrismaUserRepository";
import { UserAdaper } from "@user/api/UserAdapter";
import { UserService } from "@user/service/UserService";
import { UserController } from "@user/inBound/UserController";

export function userComposeModule(container: Container): void {
  container
    .bind<IUserRepository>(TYPES.IUserRepository)
    .to(PrismaUserRepository)
    .inRequestScope();
  container
    .bind<IUserService>(TYPES.IUserService)
    .to(UserService)
    .inRequestScope();
  container.bind<IUserPort>(TYPES.IUserPort).to(UserAdaper).inRequestScope();
  container
    .bind<UserController>(TYPES.UserController)
    .to(UserController)
    .inRequestScope();
}
