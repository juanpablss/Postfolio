export class HttpError extends Error {
  constructor(public statusCode: number, public name: string, message: string) {
    super(message);
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(401, "Unauthorized", message);
  }
}

export class TokenExpired extends Unauthorized {
  constructor() {
    super("Token de acesso expirado");
  }
}

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(403, "Forbidden", message);
  }
}

export class NotFound extends HttpError {
  constructor(message: string) {
    super(404, "Not Found", message);
  }
}
