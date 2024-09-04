import { Injectable } from '@nestjs/common';
import { PrService } from './pr/pr.service';
import { TenderingService } from './tendering/tendering.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prService: PrService,
    private readonly tenderService: TenderingService,
  ) {}
  async create() {
    const token = '';
    const id: string = await this.prService.create(token);
    await this.tenderService.create(id, token);
    return `tender ready to be approved, its id is ${id}`;
  }
}
