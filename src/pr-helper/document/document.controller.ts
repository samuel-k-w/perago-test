import { Controller, Get } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async sendFakeData() {
    const response = await this.documentService.sendFakeData(' ');
    return {
      status: response,
    };
  }
}
