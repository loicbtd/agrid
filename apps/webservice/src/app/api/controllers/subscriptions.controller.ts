import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { SubscribeRequest } from '@workspace/common/requests';
import { SubscriptionEntity } from '@workspace/common/entities';
import { SubscriptionService } from '../../domain/services/subscriptions.service';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'subscribe' })
  async subscribe(
    @Body() command: SubscribeRequest
  ): Promise<SubscriptionEntity> {
    return this.subscriptionService.subscribe(command);
  }
}
