import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { SubscriptionService } from '../../domain/services/subscriptions.service';
import { DateStatisticsResponseDto } from '@workspace/common/responses';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  @Get('retrieveUsersCountOverTime')
  @ApiOperation({ summary: "retrieve users' count over time" })
  async retrieveUsersCountOverTime(
    @Query('step') step: string
  ): Promise<DateStatisticsResponseDto[]> {
    return await this.usersService.retrieveCount(step);
  }

  @Get('retrieveSubscriptionsCountOverTime')
  @ApiOperation({ summary: "retrieve subscriptions' count over time" })
  async retrieveSubscriptionsCountOverTime(
    @Query('step') step: string
  ): Promise<DateStatisticsResponseDto[]> {
    return await this.subscriptionService.retrieveCount(step);
  }

  @Get('retrieveUserCountOnCurrentMonth')
  @ApiOperation({ summary: "retrieve user' count on current month" })
  async retrieveUserCountOnCurrentMonth(): Promise<
    DateStatisticsResponseDto[]
  > {
    return await this.usersService.retrieveCountOnCurrentMonth();
  }

  @Get('retrieveSalesCountOverTime')
  @ApiOperation({ summary: "retrieve subscriptions' sales count over time" })
  async retrieveSalesCountOverTime(
    @Query('step') step: string
  ): Promise<DateStatisticsResponseDto[]> {
    return await this.subscriptionService.retreiveSalesCount(step);
  }
}
