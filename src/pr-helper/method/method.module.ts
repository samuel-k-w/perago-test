import { Module } from '@nestjs/common';
import { MethodController } from './method.controller';
import { MethodService } from './method.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [MethodController],
  providers: [MethodService],
  exports: [MethodService],
})
export class MethodModule {}
