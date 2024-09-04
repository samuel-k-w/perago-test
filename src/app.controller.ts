import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('create-pr-tender')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create() {
    return await this.appService.create();
  }
}
