import { ApplicationError } from './application.error';

export class ImpossibleToSigninError extends ApplicationError {
  constructor() {
    super('Impossible to sign in');
  }
}
