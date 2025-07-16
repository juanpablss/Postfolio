export interface IWorkPort {
  workExists(workId: string): Promise<boolean>;
}
