import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { Body, Get, UseGuards } from '@nestjs/common/decorators';
import { SubscribeRequest } from '@workspace/common/requests';
import { SubscriptionEntity } from '@workspace/common/entities';
import { SubscriptionService } from '../../domain/services/subscriptions.service';
import { apiRoutes } from '@workspace/common/constants';
import { JwtGuard } from '../guards/jwt.guard';
import { JwtPayload } from '../decorators/jwt-payload.decorator';
import { TokenPayloadModel } from '../../domain/models/token-payload.model';

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

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(apiRoutes.subscriptions.retrieveMySubscriptions)
  @ApiOperation({ summary: 'retrieve my subscriptions' })
  async retrieveMySubscription(
    @JwtPayload() payload: TokenPayloadModel
  ): Promise<SubscriptionEntity[]> {
    return await this.subscriptionService.retrieveMySubscriptions(
      payload.userId
    );
  }
}
