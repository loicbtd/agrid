import { PlansService } from './../../domain/services/plans.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { UseGuards, Get, Body } from '@nestjs/common/decorators';
import { JwtGuard } from '../../api/guards/jwt.guard';
import { PlanEntity } from '@workspace/common/entities';
import { CreatePlanRequest } from '@workspace/common/requests';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  @ApiOperation({ summary: 'Creates a plan' })
  async create(@Body() command: CreatePlanRequest): Promise<PlanEntity> {
    return this.plansService.create({
      name: command.name,
      price: command.price,
      supportType: { id: command.supportTypeId },
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('retrieve')
  @ApiOperation({ summary: 'Retrieves plans' })
  async retrieve(): Promise<PlanEntity[]> {
    return this.plansService.retrieve();
  }
}
