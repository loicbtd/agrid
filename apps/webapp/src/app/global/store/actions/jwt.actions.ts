export class Refresh {
  static readonly type = '[Jwt] Refresh';
  constructor(public jwt?: string) {}
}
