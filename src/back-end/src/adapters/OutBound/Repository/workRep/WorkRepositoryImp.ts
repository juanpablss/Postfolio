import Work from "@domain/entities/work/Work";
import WorkRepository from "@domain/entities/work/WorkRepository";
import prismaWorkRepository, {
  PrismaWorkRepository,
} from "@repository/workRep/PrismaWorkRepository";
import Mapper from "@util/Mapper";

export class WorkRepositoryImp implements WorkRepository {
  constructor(private readonly prismaWorkRepository: PrismaWorkRepository) {}

  async insert(work: Work): Promise<Work> {
    const workModel = await this.prismaWorkRepository.insert(
      Mapper.Work.toPrisma(work)
    );
    return Mapper.Work.toDomain(workModel);
  }

  async findMany(): Promise<Work[]> {
    const workModels = await this.prismaWorkRepository.findMany();
    return (await workModels).map(Mapper.Work.toDomain);
  }

  async findById(id: string): Promise<Work> {
    const workModel = await this.findById(id);
    return Mapper.Work.toDomain(workModel);
  }

  async findByPortfolio(portfolioId: string): Promise<Work[]> {
    const workModels = await this.prismaWorkRepository.findByPortfolio(
      portfolioId
    );
    return (await workModels).map(Mapper.Work.toDomain);
  }

  async update(work: Work): Promise<Work> {
    const workModel = await this.prismaWorkRepository.update(
      Mapper.Work.toPrisma(work)
    );
    return Mapper.Work.toDomain(workModel);
  }

  async delete(id: string): Promise<Work | null> {
    const workModel = await this.prismaWorkRepository.delete(id);
    return Mapper.Work.toDomain(workModel);
  }
}

const workRepository: WorkRepository = new WorkRepositoryImp(
  prismaWorkRepository
);
export default workRepository;
