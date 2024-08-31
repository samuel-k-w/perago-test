import { Module } from '@nestjs/common';
import { IdentificationController } from './identification.controller';

@Module({
  controllers: [IdentificationController]
})
export class IdentificationModule {}
