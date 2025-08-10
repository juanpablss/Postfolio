export interface UserPort {
  exist(userId: string): Promise<boolean>;
}
