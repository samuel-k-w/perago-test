import { Module } from '@nestjs/common';
import { TenderingService } from './tendering.service';
import { TenderingController } from './tendering.controller';

@Module({
  controllers: [TenderingController],
  providers: [TenderingService],
})
export class TenderingModule {}
