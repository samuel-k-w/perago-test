import { Controller, Post } from '@nestjs/common';
import { TenderingService } from './tendering.service';

@Controller('tendering')
export class TenderingController {
  constructor(private readonly tenderingService: TenderingService) {}

  @Post()
  create() {
    return this.tenderingService.create(createTenderingDto);
  }
}
