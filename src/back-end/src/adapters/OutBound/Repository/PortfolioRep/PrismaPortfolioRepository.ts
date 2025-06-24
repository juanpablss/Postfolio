import PrismaPortfolio from "@models/PrismaPortfolio";
import { prisma } from "@infrastructure/config/Prisma";
import { InternalServerError } from "@domain/error/HttpError";

export class PrismaPortfolioRepository {
  async insert(prismaPortfolio: PrismaPortfolio): Promise<PrismaPortfolio> {
    try {
      return await prisma.portfolio.create({
        data: {
          name: prismaPortfolio.name,
          description: prismaPortfolio.description,
          pageLink: prismaPortfolio.pageLink,
          authorId: prismaPortfolio.authorId,
        },
      });
    } catch (error) {
      throw new InternalServerError("Erro ao salvar Portfolio!");
    }
  }

  async findMany(): Promise<PrismaPortfolio[]> {
    return await prisma.portfolio.findMany();
  }

  async findById(id: string): Promise<PrismaPortfolio | null> {
    return await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });
  }

  async findByAuthor(authorId: string): Promise<PrismaPortfolio | null> {
    return await prisma.portfolio.findUnique({
      where: { authorId },
    });
  }

  async update(prismaPortfolio: PrismaPortfolio): Promise<PrismaPortfolio> {
    try {
      return await prisma.portfolio.update({
        where: {
          id: prismaPortfolio.id,
        },
        data: {
          name: prismaPortfolio.name,
          description: prismaPortfolio.description,
          pageLink: prismaPortfolio.pageLink,
        },
      });
    } catch (error) {
      throw new InternalServerError("Não foi possivel atualizar o portfolio!");
    }
  }

  async deleteById(id: string): Promise<PrismaPortfolio | null> {
    try {
      return await prisma.portfolio.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError("Não foi possivel deletar o portfolio!");
    }
  }
}

const prismaPortfolioRepository = new PrismaPortfolioRepository();
export default prismaPortfolioRepository;
