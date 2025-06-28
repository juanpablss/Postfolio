import PrismaUser from "@models/PrismaUser";
import User from "@domain/entities/user/User";
import PrismaPortfolio from "@models/PrismaPortfolio";
import Portfolio from "@domain/entities/portfolio/Portfolio";
import PrismaRating from "@models/PrismaRating";
import Rating from "@domain/entities/rating/Rating";
import Email from "@domain/valueObject/Email";
import PrismaCompetition from "@models/PrismaCompetition";
import Competition from "@domain/entities/competition/Competition";
import PrismaWork from "@models/PrismaWork";
import Work from "@domain/entities/work/Work";
import PrismaWorkCompDetails from "@models/PrismaWorkComDetails";
import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";
import { CreateUserDTO } from "@dtos/UserDTO";

const UserMapper = {
  fromPrismatoDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      new Email(prismaUser.email, false),
      prismaUser.password,
      prismaUser.status
    );
  },
  fromDomaintoPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
      password: user.password,
      status: user.status,
    };
  },
  fromCreateUserDTOtoDomain(dto: CreateUserDTO, hashedPassword: string): User {
    return new User(
      "",
      dto.name,
      new Email(dto.email),
      hashedPassword,
      dto.status
    );
  },
};

const PortfolioMapper = {
  toDomain(prismaPortfolio: PrismaPortfolio): Portfolio {
    return new Portfolio(
      prismaPortfolio.id,
      prismaPortfolio.name,
      prismaPortfolio.description,
      prismaPortfolio.pageLink,
      prismaPortfolio.authorId
    );
  },
  toPrisma(portfolio: Portfolio): PrismaPortfolio {
    return {
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      pageLink: portfolio.pageLink,
      authorId: portfolio.authorId,
    };
  },
};

const RatingMapper = {
  toDomain(prismaRating: PrismaRating): Rating {
    return new Rating(
      prismaRating.id,
      prismaRating.userId,
      prismaRating.workDetailsId,
      prismaRating.score
    );
  },
  toPrisma(rating: Rating): PrismaRating {
    return {
      id: rating.id,
      userId: rating.userId,
      workDetailsId: rating.workDetailsId,
      score: rating.score,
    };
  },
};

const CompetitionMapper = {
  toDomain(prismaCompetition: PrismaCompetition): Competition {
    return new Competition(
      prismaCompetition.id,
      prismaCompetition.name,
      prismaCompetition.createdAt,
      prismaCompetition.startsAt,
      prismaCompetition.endsAt
    );
  },
  toPrisma(competition: Competition): PrismaCompetition {
    return {
      id: competition.id,
      name: competition.name,
      createdAt: competition.createdAt,
      startsAt: competition.startsAt,
      endsAt: competition.endsAt,
    };
  },
};

const WorkMapper = {
  toDomain(prismaWork: PrismaWork): Work {
    return new Work(
      prismaWork.id,
      prismaWork.name,
      prismaWork.description,
      prismaWork.githubLink,
      prismaWork.portfolioId
    );
  },
  toPrisma(work: Work): PrismaWork {
    return {
      id: work.id,
      name: work.name,
      description: work.description,
      githubLink: work.githubLink,
      portfolioId: work.portfolioId,
    };
  },
};

const WorkCompDetailsMapper = {
  toDomain(prismaWorkCompDetails: PrismaWorkCompDetails): WorkCompDetails {
    const details = new WorkCompDetails(
      prismaWorkCompDetails.id,
      prismaWorkCompDetails.totalReviewers,
      prismaWorkCompDetails.totalScore,
      prismaWorkCompDetails.competitionId,
      prismaWorkCompDetails.workId
    );

    if (prismaWorkCompDetails.work) {
      details.work = WorkMapper.toDomain(prismaWorkCompDetails.work);
    }

    return details;
  },
  toPrisma(workCompDetails: WorkCompDetails): PrismaWorkCompDetails {
    return {
      id: workCompDetails.id,
      totalReviewers: workCompDetails.totalReviewers,
      totalScore: workCompDetails.totalScore,
      competitionId: workCompDetails.competitionId,
      workId: workCompDetails.workId,
    };
  },
};

const Mapper = {
  User: UserMapper,
  Portfolio: PortfolioMapper,
  Rating: RatingMapper,
  Competition: CompetitionMapper,
  Work: WorkMapper,
  WorkCompDetails: WorkCompDetailsMapper,
};

export default Mapper;
