export class SendEmailError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UserEmailRegisteredError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
