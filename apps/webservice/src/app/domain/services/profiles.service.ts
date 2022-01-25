import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MyProfileModel } from '@workspace/common/models';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async retrieveMyProfile(userId: string): Promise<MyProfileModel> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new BadRequestException();
    }

    return {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }
}
