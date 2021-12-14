import { ContactRequestDto } from '@workspace/common/requests';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SupportService } from '../../domain/services/support.service';

@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly contactService: SupportService) {}

  @Post('sendsMail')
  @ApiOperation({ summary: 'Sends a message to the support team' })
  async sendContactEmail(@Body() command: ContactRequestDto): Promise<void> {
    await this.contactService.sendContactEmail(command);
  }
}
