import { Module } from '@nestjs/common';
import { BiddingService } from './bidding.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [BiddingService],
  exports: [BiddingService],
})
export class BiddingModule {}
