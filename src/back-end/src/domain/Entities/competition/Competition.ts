export default class Competition {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public startsAt: Date | null = null,
    public endsAt: Date | null = null
  ) {}
}
