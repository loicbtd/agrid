import { GlobalError } from './global.error';

export class UndefinedStripePublishableKeyError extends GlobalError {
  constructor() {
    super('Undefined stripe publishable key');
    console.log(this);
  }
}
