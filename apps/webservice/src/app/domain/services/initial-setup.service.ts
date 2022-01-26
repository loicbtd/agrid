import { SigninResponse } from '@workspace/common/responses';
import { SigninRequest } from '@workspace/common/requests';
import { Body, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class InitialSetupService {
  constructor(private readonly usersService: UsersService) {}

  async isPermitted(): Promise<boolean> {
    if (await this.usersService.isThereAtLeastOneAdministrator()) {
      return false;
    }

    return true;
  }

  async initialize(@Body() command: SigninRequest): Promise<SigninResponse> {
    return new SigninResponse();
  }
}
