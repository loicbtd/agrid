import { Logger, Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [ApiModule, DomainModule, InfrastructureModule],
  providers: [Logger],
})
export class AppModule {}
