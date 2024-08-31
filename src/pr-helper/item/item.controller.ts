import { Controller, Get } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async sendFakeData() {
    // const response = await this.itemService.sendFakeData("").toPromise();
    // return {
    //   status: response.status,
    //   data: response.data,
    // };
  }
}
