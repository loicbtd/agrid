import { DomainError } from './domain.error';

export class UnkownPlanError extends DomainError {
  constructor() {
    super('Plan inconnu');
  }
}
