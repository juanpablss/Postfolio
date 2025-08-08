import {
  CreatePortfolioDTO,
  UpdatePortfolioDTO,
} from "@portfolio/api/PortfolioDTO";
import { Portfolio, WorkData } from "@portfolio/domain/entities/Portfolio";
import { Portfolio as PortfolioModel } from "@prisma/client";
import { Work as WorkModel } from "@prisma/client";

export const PortfolioMapper = {
  fromPrismatoDomain(
    prismaPortfolio: PortfolioModel & { works?: WorkModel[] }
  ): Portfolio {
    let works = undefined;

    if (prismaPortfolio.works) {
      works = prismaPortfolio.works.map(
        (data) =>
          new WorkData(
            data.id,
            data.name,
            data.description,
            data.githubLink,
            data.portfolioId
          )
      );
    }

    return new Portfolio(
      prismaPortfolio.id,
      prismaPortfolio.name,
      prismaPortfolio.description,
      prismaPortfolio.pageLink,
      prismaPortfolio.authorId,
      works
    );
  },
  fromDomaintoPrisma(portfolio: Portfolio): PortfolioModel {
    return {
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      pageLink: portfolio.pageLink,
      authorId: portfolio.authorId,
    };
  },
  fromCreatePortfolioDTOtoDomain(dto: CreatePortfolioDTO): Portfolio {
    return new Portfolio(
      "",
      dto.name,
      dto.description,
      dto.pagelink,
      dto.authorId
    );
  },
  fromUpdatePortfolioDTOtoDomain(dto: UpdatePortfolioDTO): Portfolio {
    return new Portfolio(
      dto.id,
      dto.name,
      dto.description,
      dto.pagelink,
      dto.authorId
    );
  },
};
