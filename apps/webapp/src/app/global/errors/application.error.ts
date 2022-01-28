export class ApplicationError extends ErrorEvent {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
