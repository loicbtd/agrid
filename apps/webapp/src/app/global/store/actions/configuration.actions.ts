import { ConfigurationModel } from '@workspace/common/models';

export class Get {
  static readonly type = '[Configuration] Get';
}

export class Refresh {
  static readonly type = '[Configuration] Refresh Success';
  constructor(public configuration: ConfigurationModel) {}
}
