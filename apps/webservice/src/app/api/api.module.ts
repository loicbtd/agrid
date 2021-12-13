import { Global, Logger, Module } from '@nestjs/common';
import { IdentitiesController } from '../api/controllers/identities.controller';
import { PlansController } from './controllers/plans.controller';

@Global()
@Module({
  controllers: [IdentitiesController, PlansController],
  providers: [Logger],
})
export class ApiModule {}
