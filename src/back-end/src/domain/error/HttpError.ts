export class HttpError extends Error {
  statusCode: number;
  //   msg: string;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;

    // this.msg = msg;
  }
}
