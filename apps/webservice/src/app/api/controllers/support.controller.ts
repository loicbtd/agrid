import { SupportRequest } from '@workspace/common/requests';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SupportService } from '../../domain/services/support.service';

@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly contactService: SupportService) {}

  @Post('request')
  @ApiOperation({ summary: 'requests the support team' })
  async sendContactEmail(@Body() command: SupportRequest): Promise<void> {
    await this.contactService.request(command);
  }
}
