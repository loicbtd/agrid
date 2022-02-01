import { SupportRequest } from '@workspace/common/requests';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SupportService } from '../../domain/services/support.service';
import { apiRoutes } from '@workspace/common/constants';

@ApiTags(apiRoutes.support.root)
@Controller(apiRoutes.support.root)
export class SupportController {
  constructor(private readonly contactService: SupportService) {}

  @Post(apiRoutes.support.request)
  @ApiOperation({ summary: 'requests the support team' })
  async sendContactEmail(@Body() command: SupportRequest): Promise<void> {
    await this.contactService.request(command);
  }
}
