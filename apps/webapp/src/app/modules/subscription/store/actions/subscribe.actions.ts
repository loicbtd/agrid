import { SubscribeRequest } from "@workspace/common/requests";

export class Refresh {
  static readonly type = '[Subscribe Request] Refresh';
  constructor(public subscribeRequest: SubscribeRequest) {}
}
