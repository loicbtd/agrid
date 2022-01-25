import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { SubscribeRequest } from '@workspace/common/requests';
import { SubscriptionEntity } from '@workspace/common/entities';
import { SubscriptionService } from '../../domain/services/subscriptions.service';
import { apiRoutes } from '@workspace/common/constants';

@ApiTags(apiRoutes.subscriptions.root)
@Controller(apiRoutes.subscriptions.root)
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(apiRoutes.subscriptions.subscribe)
  @ApiOperation({ summary: 'subscribes to a plan' })
  async subscribe(
    @Body() command: SubscribeRequest
  ): Promise<SubscriptionEntity> {
    return this.subscriptionService.subscribe(command);
  }
}
