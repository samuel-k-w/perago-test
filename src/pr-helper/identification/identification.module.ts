import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IdentificationController } from './identification.controller';
import { IdentificationService } from './identification.service';

@Module({
  imports: [HttpModule],
  controllers: [IdentificationController],
  providers: [IdentificationService],
  exports: [IdentificationService],
})
export class IdentificationModule {}
