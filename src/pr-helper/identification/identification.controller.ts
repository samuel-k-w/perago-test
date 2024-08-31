import { Controller, Get } from '@nestjs/common';
import { IdentificationService } from './identification.service';

@Controller('identification')
export class IdentificationController {
  constructor(private readonly identificationService: IdentificationService) {}

  @Get()
  async sendFakeData() {
    // const response = await this.identificationService
    //   .sendFakeData()
    //   .toPromise();
    // return {
    //   status: response.status,
    //   data: response.data,
    // };
  }
}
