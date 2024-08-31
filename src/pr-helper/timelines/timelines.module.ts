import { Module } from '@nestjs/common';
import { TimelinesController } from './timelines.controller';
import { TimelinesService } from './timelines.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [TimelinesController],
  providers: [TimelinesService],
  exports: [TimelinesService],
})
export class TimelinesModule {}
