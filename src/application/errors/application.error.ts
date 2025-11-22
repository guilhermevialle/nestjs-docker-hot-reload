export interface CreateApplicationError {
  errorCode?: string;
  statusCode?: number;
}

export class ApplicationError extends Error {
  public readonly occurredAt: Date;
  public readonly errorCode: string;
  public readonly statusCode: number;

  constructor(
    message: string = 'Unexpected server error.',
    options: CreateApplicationError = {},
  ) {
    super(message);

    this.occurredAt = new Date();
    this.errorCode = options.errorCode ?? 'ERR_UNEXPECTED_ERROR';
    this.statusCode = options.statusCode ?? 500;
  }
}
