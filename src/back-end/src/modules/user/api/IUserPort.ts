export interface IUserPort {
  exist(userId: string): Promise<boolean>;
}
