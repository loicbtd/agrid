import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { apiRoutes } from '@workspace/common/constants';
import { MyProfileModel, UserProfileModel } from '@workspace/common/models';
import { UpdateProfileRequest } from '@workspace/common/requests';
import { TokenPayload } from '../../domain/models/token-payload.model';
import { ProfilesService } from '../../domain/services/profiles.service';
import { JwtPayload } from '../decorators/jwt-payload.decorator';
import { JwtGuard } from '../guards/jwt.guard';

@ApiTags(apiRoutes.profiles.root)
@Controller(apiRoutes.profiles.root)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(apiRoutes.profiles.retrieveMyProfile)
  @ApiOperation({ summary: 'retrieves my profile' })
  async retrieveMyProfile(
    @JwtPayload() payload: TokenPayload
  ): Promise<MyProfileModel> {
    return await this.profilesService.retrieveMyProfile(payload.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(apiRoutes.profiles.retrieveAllProfiles)
  @ApiOperation({ summary: "retrieves alls users' profile" })
  async retrieveAllProfile(): Promise<UserProfileModel[]> {
    return await this.profilesService.retrieveAllProfile();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiOperation({ summary: "update users' profile" })
  async updateProfile(
    @Param('id') id: string,
    @Body() command: UpdateProfileRequest
  ): Promise<UserProfileModel> {
    return await this.profilesService.updateProfile(id, command);
  }
}
