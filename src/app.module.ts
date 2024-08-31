import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrModule } from './pr/pr.module';
import { IdentificationModule } from './pr-helper/identification/identification.module';
import { MethodModule } from './pr-helper/method/method.module';
import { ItemModule } from './pr-helper/item/item.module';
import { DocumentModule } from './pr-helper/document/document.module';
import { TimelinesModule } from './pr-helper/timelines/timelines.module';
import { TenderingModule } from './tendering/tendering.module';
import { ConfigurationModule } from './tn-helper/configuration/configuration.module';
import { BiddingModule } from './tn-helper/bidding/bidding.module';
import { EvaluationModule } from './tn-helper/evaluation/evaluation.module';
import { InvitationModule } from './tn-helper/invitation/invitation.module';

@Module({
  imports: [
    PrModule,
    IdentificationModule,
    MethodModule,
    ItemModule,
    DocumentModule,
    TimelinesModule,
    TenderingModule,
    ConfigurationModule,
    BiddingModule,
    EvaluationModule,
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
