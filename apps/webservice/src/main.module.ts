import { InfrastructureModule } from 'infrastructure/infrastructure.module';
import { ApiModule } from 'api/api.module';
import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [ApiModule, DomainModule, InfrastructureModule],
})
export class MainModule {}
