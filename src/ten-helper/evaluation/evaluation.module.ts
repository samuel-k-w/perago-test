import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [EvaluationService],
  exports: [EvaluationService],
})
export class EvaluationModule {}
