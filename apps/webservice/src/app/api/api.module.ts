import { Global, Module } from '@nestjs/common';
import { IdentitiesController } from '../api/controllers/identities.controller';

@Global()
@Module({
  controllers: [IdentitiesController],
})
export class ApiModule {}
