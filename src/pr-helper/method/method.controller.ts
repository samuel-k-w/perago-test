import { Controller, Get } from '@nestjs/common';
import { MethodService } from './method.service';

@Controller('method')
export class MethodController {
  constructor(private readonly methodService: MethodService) {}

  @Get()
  async sendFakeData() {
    // const response = await this.methodService.sendFakeData("no").toPromise();
    // return {
    //   status: response.status,
    //   data: response.data,
    // };
  }
}
