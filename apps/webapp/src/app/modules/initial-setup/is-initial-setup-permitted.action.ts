export class Refresh {
  static readonly type = '[Is Initial Setup Permitted] Refresh';
  constructor(public isPermitted: boolean) {}
}
