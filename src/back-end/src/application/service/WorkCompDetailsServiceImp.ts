import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";
import WorkCompDetailsRepository from "@domain/entities/workCompDetails/WorkCompDetailsRepository";
import workCompDetailsRepositoryImp from "@repository/workCompDetailsRep/WorkCompDetailsRepositoryImp";
import WorkCompDetailsUseCase from "@useCases/WorkCompDetailsUseCase";

class WorkCompDetailsServiceImp implements WorkCompDetailsUseCase {
  constructor(
    private readonly workCompDetailsRepository: WorkCompDetailsRepository
  ) {}

  async findByCompetitionAndWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails | null> {
    return await this.workCompDetailsRepository.findByCompetitionAndWork(
      competitionId,
      workId
    );
  }
}

const workCompDetailsServiceImp: WorkCompDetailsUseCase =
  new WorkCompDetailsServiceImp(workCompDetailsRepositoryImp);
export default workCompDetailsServiceImp;
