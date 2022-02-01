import { PlansService } from './../../domain/services/plans.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import {
  UseGuards,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common/decorators';
import { JwtGuard as JwtGuard } from '../guards/jwt.guard';
import { PlanEntity } from '@workspace/common/entities';
import {
  CreatePlanRequest,
  UpdatePlanRequest,
} from '@workspace/common/requests';
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
      stripeProductId: command.stripeProductId,
      stripeProductPriceId: command.stripeProductPriceId,
    });
  }

  @Get(apiRoutes.plans.retrieve)
  @ApiOperation({ summary: 'retrieves plans' })
  async retrieve(): Promise<PlanEntity[]> {
    return this.plansService.retrieve();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiOperation({ summary: 'update a plan' })
  async update(
    @Param('id') id: string,
    @Body() command: UpdatePlanRequest
  ): Promise<void> {
    await this.plansService.update(id, command);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'delete a plan' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.plansService.delete(id);
  }
}
