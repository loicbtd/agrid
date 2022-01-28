import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '@workspace/common/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MyProfileModel, UserProfileModel } from '@workspace/common/models';
import { UpdateProfileRequest } from '@workspace/common/requests';

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

  async retrieveAllProfile(): Promise<UserProfileModel[]> {
    const users = await this.usersRepository.find({
      order: {
        lastname: 'ASC',
        firstname: 'ASC',
      },
    });
    return users.map((user: UserEntity) => {
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
    });
  }

  async updateProfile(
    id: string,
    command: UpdateProfileRequest
  ): Promise<UserProfileModel> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException();
    }
    user.firstname =
      command.firstname.charAt(0).toUpperCase() + command.firstname.slice(1);
    user.lastname = command.lastname;
    await this.usersRepository.save(user);
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname.toUpperCase(),
      email: user.email,
    };
  }
}
