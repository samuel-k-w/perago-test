import { Module } from '@nestjs/common';
import { TenderingService } from './tendering.service';
import { TenderingController } from './tendering.controller';
import { BiddingModule } from 'src/ten-helper/bidding/bidding.module';
import { ConfigurationModule } from 'src/ten-helper/configuration/configuration.module';
import { InvitationModule } from 'src/ten-helper/invitation/invitation.module';
import { EvaluationModule } from 'src/ten-helper/evaluation/evaluation.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    BiddingModule,
    ConfigurationModule,
    EvaluationModule,
    InvitationModule,
    HttpModule,
  ],
  controllers: [TenderingController],
  providers: [TenderingService],
  exports: [TenderingService],
})
export class TenderingModule {}
