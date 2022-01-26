import { PerformInitialSetupRequest } from '@workspace/common/requests';
import { Injectable } from '@nestjs/common';
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

  async perform(command: PerformInitialSetupRequest): Promise<void> {
    return;
  }
}
