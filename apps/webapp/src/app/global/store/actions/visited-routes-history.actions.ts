export class Remember {
  static readonly type = '[Visited Routes History] Remember';
  constructor(public url: string) {}
}
