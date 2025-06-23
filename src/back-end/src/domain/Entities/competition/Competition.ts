export default class Competition {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public startsAt: Date | null,
    public endsAt: Date | null
  ) {}
}
