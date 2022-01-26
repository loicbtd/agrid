import { PerformInitialSetupRequest } from '@workspace/common/requests';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { AlreadyExistingUserError } from '../errors/already-existing-user.error';
import { GlobalRoleEnumeration } from '@workspace/common/enumerations';

@Injectable()
export class InitialSetupService {
  constructor(private readonly usersService: UsersService) {}

  async isPermitted(): Promise<boolean> {
    return !(await this.usersService.isThereAtLeastOneAdministrator());
  }

  async perform(command: PerformInitialSetupRequest): Promise<void> {
    if (await this.usersService.doesItAlreadyExist({ email: command.email })) {
      throw new AlreadyExistingUserError();
    }

    await this.usersService.create(
      {
        email: command.email,
        password: command.password,
        firstname: 'admin',
        lastname: 'admin',
      },
      { globalRoles: [GlobalRoleEnumeration.Administrator] }
    );
  }
}
