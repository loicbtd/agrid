import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { SubscriptionService } from '../../domain/services/subscriptions.service';
import { DateStatisticsResponseDto } from '@workspace/common/responses';
import { apiRoutes } from '@workspace/common/constants';
import { JwtGuard } from '../guards/jwt.guard';

@ApiTags(apiRoutes.statistics.root)
@Controller(apiRoutes.statistics.root)
export class StatisticsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(apiRoutes.statistics.retrieveUsersCountOverTime)
  @ApiOperation({ summary: "retrieve users' count over time" })
  async retrieveUsersCountOverTime(
    @Query('step') step: string
  ): Promise<DateStatisticsResponseDto[]> {
    return await this.usersService.retrieveCount(step);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(apiRoutes.statistics.retrieveSubscriptionsCountOverTime)
  @ApiOperation({ summary: "retrieve subscriptions' count over time" })
  async retrieveSubscriptionsCountOverTime(
    @Query('step') step: string
  ): Promise<DateStatisticsResponseDto[]> {
    return await this.subscriptionService.retrieveCount(step);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(apiRoutes.statistics.retrieveUserCountOnCurrentMonth)
  @ApiOperation({ summary: "retrieve user' count on current month" })
  async retrieveUserCountOnCurrentMonth(): Promise<
    DateStatisticsResponseDto[]
  > {
    return await this.usersService.retrieveCountOnCurrentMonth();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(apiRoutes.statistics.retrieveSalesCountOverTime)
  @ApiOperation({ summary: "retrieve subscriptions' sales count over time" })
  async retrieveSalesCountOverTime(
    @Query('step') step: string
  ): Promise<DateStatisticsResponseDto[]> {
    return await this.subscriptionService.retreiveSalesCount(step);
  }
}
