import { PlansService } from './../../domain/services/plans.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { UseGuards, Get, Body } from '@nestjs/common/decorators';
import { JwtGuard as JwtGuard } from '../guards/jwt.guard';
import { PlanEntity } from '@workspace/common/entities';
import { CreatePlanRequest } from '@workspace/common/requests';
import { apiRoutes } from '@workspace/common/constants';
import { Authorize } from '../decorators/authorize.decorator';

@ApiTags(apiRoutes.plans.root)
@Controller(apiRoutes.plans.root)
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post(apiRoutes.plans.create)
  @ApiOperation({ summary: 'creates a plan' })
  async create(@Body() command: CreatePlanRequest): Promise<PlanEntity> {
    return this.plansService.create({
      name: command.name,
      price: command.price,
      supportType: { id: command.supportTypeId },
    });
  }

  @Authorize()
  @Get(apiRoutes.plans.retrieve)
  @ApiOperation({ summary: 'retrieves plans' })
  async retrieve(): Promise<PlanEntity[]> {
    return this.plansService.retrieve();
  }
}
