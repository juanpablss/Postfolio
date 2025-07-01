import Competition from "@domain/entities/competition/Competition";
import CompetitionRepository from "@domain/entities/competition/CompetitionRepository";
import prismaCompetitionRepository, {
  PrismaCompetitionRepository,
} from "@repository/competitionRep/PrismaCompetitionRepository";
import Mapper from "@shared/util/Mapper";

class CompetitionRepositoryImp implements CompetitionRepository {
  constructor(
    private readonly prismaCompetitionRepository: PrismaCompetitionRepository
  ) {}

  async insert(competition: Competition): Promise<Competition> {
    const competitionModel = Mapper.Competition.toPrisma(competition);
    const compeititonDomain = await this.prismaCompetitionRepository.inserte(
      competitionModel
    );

    return Mapper.Competition.toDomain(compeititonDomain);
  }

  async findById(id: string): Promise<Competition | null> {
    const competitionModel = await this.prismaCompetitionRepository.findById(
      id
    );
    if (!competitionModel) return null;

    return Mapper.Competition.toDomain(competitionModel);
  }

  async findMany(): Promise<Competition[]> {
    const competitionModels = await this.prismaCompetitionRepository.findMany();
    return competitionModels.map(Mapper.Competition.toDomain);
  }

  async update(competition: Competition): Promise<Competition> {
    const competitionModel = await this.prismaCompetitionRepository.update(
      Mapper.Competition.toPrisma(competition)
    );
    return Mapper.Competition.toDomain(competitionModel);
  }

  async deleteById(id: string): Promise<Competition | null> {
    const competitionModel = await this.prismaCompetitionRepository.delete(id);
    if (!competitionModel) return null;
    return Mapper.Competition.toDomain(competitionModel);
  }
}

const competitionRepositoryImp: CompetitionRepository =
  new CompetitionRepositoryImp(prismaCompetitionRepository);
export default competitionRepositoryImp;
