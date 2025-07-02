import {
  CreatePortfolioDTO,
  UpdatePortfolioDTO,
} from "@portfolio/dtos/PortfolioDTO";
import Portfolio from "@portfolio/domain/entities/Portfolio";
import { Portfolio as PortfolioModel } from "@prisma/client";

export const PortfolioMapper = {
  fromPrismatoDomain(prismaPortfolio: PortfolioModel): Portfolio {
    return new Portfolio(
      prismaPortfolio.id,
      prismaPortfolio.name,
      prismaPortfolio.description,
      prismaPortfolio.pageLink,
      prismaPortfolio.authorId
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
