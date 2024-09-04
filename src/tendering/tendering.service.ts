import { Injectable } from '@nestjs/common';
import { BiddingService } from 'src/ten-helper/bidding/bidding.service';
import { ConfigurationService } from 'src/ten-helper/configuration/configuration.service';
import { EvaluationService } from 'src/ten-helper/evaluation/evaluation.service';
import { InvitationService } from 'src/ten-helper/invitation/invitation.service';

@Injectable()
export class TenderingService {
  constructor(
    private readonly biddingService: BiddingService,
    private readonly configurationService: ConfigurationService,
    private readonly evaluationService: EvaluationService,
    private readonly invitaionService: InvitationService,
  ) {}
  async create(id: string, token: string) {
    await this.configurationService.create(token, id);
    await this.evaluationService.create(id, token);
    await this.biddingService.create(id, token);
    await this.invitaionService.create(id, token);
    return 'This action adds a new tendering';
  }
}
