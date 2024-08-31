import { Module } from '@nestjs/common';
import { MethodController } from './method.controller';

@Module({
  controllers: [MethodController]
})
export class MethodModule {}
