import { Module } from '@nestjs/common';
import { PrService } from './pr.service';
import { PrController } from './pr.controller';
import { HttpModule } from '@nestjs/axios';
import { IdentificationModule } from '../pr-helper/identification/identification.module';
import { MethodModule } from '../pr-helper/method/method.module';
import { ItemModule } from '../pr-helper/item/item.module';
import { DocumentModule } from '../pr-helper/document/document.module';
import { TimelinesModule } from '../pr-helper/timelines/timelines.module';

@Module({
  imports: [
    HttpModule,
    IdentificationModule,
    MethodModule,
    ItemModule,
    DocumentModule,
    TimelinesModule,
  ],
  controllers: [PrController],
  providers: [PrService],
  exports: [PrService],
})
export class PrModule {}
