import { Controller, Post } from '@nestjs/common';
import { PrService } from './pr.service';

@Controller('create')
export class PrController {
  constructor(private readonly prService: PrService) {}

  @Post()
  create() {
    // return this.prService.create();
  }
}
