export class GlobalError extends Error {
  constructor(originalErrorMessage: string) {
    super(originalErrorMessage);
  }
}
