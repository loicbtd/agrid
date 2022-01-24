import { PlanEntity } from '@workspace/common/entities';

export class Refresh {
  static readonly type = '[Plans] Refresh';
  constructor(public plans: PlanEntity[]) {}
}
