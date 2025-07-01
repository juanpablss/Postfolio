import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";
import WorkCompDetailsRepository from "@domain/entities/workCompDetails/WorkCompDetailsRepository";
import prismaWorkCompDetails, {
  PrismaWorkCompDetailsRepository,
} from "@repository/workCompDetailsRep/PrismaWorkCompDetailsRepository";
import Mapper from "@shared/util/Mapper";

class WorkCompDetailsRepositoryImp implements WorkCompDetailsRepository {
  constructor(
    private readonly prismaWorkCompDetailsRepository: PrismaWorkCompDetailsRepository
  ) {}

  async insert(workCompDetails: WorkCompDetails): Promise<WorkCompDetails> {
    const workCompDetailsModel =
      await this.prismaWorkCompDetailsRepository.insert(
        Mapper.WorkCompDetails.toPrisma(workCompDetails)
      );
    return Mapper.WorkCompDetails.toDomain(workCompDetailsModel);
  }

  async findMany(): Promise<WorkCompDetails[]> {
    const workCompDetailsModels =
      await this.prismaWorkCompDetailsRepository.findMany();
    return workCompDetailsModels.map(Mapper.WorkCompDetails.toDomain);
  }
  async findById(id: string): Promise<WorkCompDetails | null> {
    const workCompDetailsModel =
      await this.prismaWorkCompDetailsRepository.findById(id);

    if (!workCompDetailsModel) return null;

    return Mapper.WorkCompDetails.toDomain(workCompDetailsModel);
  }

  async findByCompetition(competitionId: string): Promise<WorkCompDetails[]> {
    const workCompDetailsModels =
      await this.prismaWorkCompDetailsRepository.findByCompetition(
        competitionId
      );
    return workCompDetailsModels.map(Mapper.WorkCompDetails.toDomain);
  }

  async findByWork(workId: string): Promise<WorkCompDetails[]> {
    const workCompDetailsModels =
      await this.prismaWorkCompDetailsRepository.findByWork(workId);
    return workCompDetailsModels.map(Mapper.WorkCompDetails.toDomain);
  }

  async findByCompetitionAndWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails | null> {
    const workCompDetailsModel =
      await this.prismaWorkCompDetailsRepository.findByCompetitionAndWork(
        competitionId,
        workId
      );

    if (!workCompDetailsModel) return null;

    return Mapper.WorkCompDetails.toDomain(workCompDetailsModel);
  }

  async findWorksByCompetition(
    competitionId: string
  ): Promise<WorkCompDetails[]> {
    const details =
      await this.prismaWorkCompDetailsRepository.findWorksByCompetition(
        competitionId
      );
    return details.map(Mapper.WorkCompDetails.toDomain);
  }

  async update(workCompDetails: WorkCompDetails): Promise<WorkCompDetails> {
    const workCompDetailsModel =
      await this.prismaWorkCompDetailsRepository.update(
        Mapper.WorkCompDetails.toPrisma(workCompDetails)
      );

    return Mapper.WorkCompDetails.toDomain(workCompDetailsModel);
  }
  async delete(id: string): Promise<WorkCompDetails | null> {
    const workCompDetailsModel =
      await this.prismaWorkCompDetailsRepository.delete(id);

    if (!workCompDetailsModel) return null;

    return Mapper.WorkCompDetails.toDomain(workCompDetailsModel);
  }
}

const workCompDetailsRepositoryImp: WorkCompDetailsRepository =
  new WorkCompDetailsRepositoryImp(prismaWorkCompDetails);

export default workCompDetailsRepositoryImp;
