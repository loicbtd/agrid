import { Global, Logger, Module } from '@nestjs/common';
import { IdentitiesController } from '../api/controllers/identities.controller';

@Global()
@Module({
  controllers: [IdentitiesController],
  providers: [Logger],
})
export class ApiModule {}
