import { ApplicationError } from './application.error';

export class UndefinedSigninResponseError extends ApplicationError {
  constructor() {
    super('Undefined signin response');
  }
}
