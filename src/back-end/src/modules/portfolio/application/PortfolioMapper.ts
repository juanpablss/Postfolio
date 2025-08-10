import {
  CreatePortfolioDTO,
  UpdatePortfolioDTO,
} from "@portfolio/api/PortfolioDTO";
import { Portfolio } from "@portfolio/domain/entities/Portfolio";
import { Portfolio as PortfolioModel } from "@prisma/client";

export const PortfolioMapper = {
  fromPrismatoDomain(model: PortfolioModel): Portfolio {
    return new Portfolio(
      model.id,
      model.name,
      model.description,
      model.pagelink,
      model.authorId
    );
  },
  fromDomaintoPrisma(portfolio: Portfolio): PortfolioModel {
    return {
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      pagelink: portfolio.pageLink,
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
