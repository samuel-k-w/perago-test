import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BiddingService {
  private readonly apiurlPreparations =
    'https://dev-bo.megp.peragosystems.com/tendering/api/bds-preparations';
  private readonly apiurlGeneral =
    'https://dev-bo.megp.peragosystems.com/tendering/api/bds-generals';
  private readonly apiurlSubmission =
    'https://dev-bo.megp.peragosystems.com/tendering/api/bds-submissions';
  private readonly apiurlEvaluation =
    'https://dev-bo.megp.peragosystems.com/tendering/api/bds-evaluations';
  private readonly apiurlAward =
    'https://dev-bo.megp.peragosystems.com/tendering/api/bds-awards';

  constructor(private httpService: HttpService) {}

  create(id: string, token: string) {
    const bds_generals = {
      clarificationDeadline: '2024-08-14T21:00:00.000Z',
      jointVentureAllowed: false,
      maximumNumberOfMembers: 34,
      maximumPercentageContractingAllowed: 0,
      preBidConferenceDate: '1970-01-01T00:00:00.000Z',
      preBidConferenceRequired: false,
      siteVisitAllowed: false,
      subContractAllowed: false,
      tenderId: id,
    };

    const bds_Preparation = {
      bidValidityPeriod: 3,
      currencyOfTheBidForNationalBidders: {
        localInput: 'Local currency Only',
        importedInput: 'Local currency Only',
      },
      currencyOfTheBidForInternationalBidders: {
        localInput: 'Local currency Only',
        importedInput: 'Local currency Only',
      },
      importedInput: 'Local currency Only',
      localInput: 'Local currency Only',
      incotermType: 'DDP',
      incotermsEdition: ' 2021',
      tenderId: id,
    };

    const enveloptype = ['single envelop', 'two envelop'];

    const bds_submissions = {
      envelopType: this.getRandomEnvelopType(),
      invitationDate: '2024-08-07T08:30:00.996Z',
      openingDate: '2024-08-24T13:30:00.137Z',
      submissionDeadline: '2024-08-16T12:30:00.210Z',
      tenderId: id,
    };

    const awardType = ['item based', 'lot based'];
    const evaluationMethod = ['point system', 'compliance'];

    const selectedEvaluationMethod = this.getevaluationMethod();
    const bds_evaluation = {
      awardType: this.getAwardType(),
      bidEvaluationCurrency: ['SAR'],
      ...(selectedEvaluationMethod === 'point system'
        ? {
            financialWeight: 70,
            passingMark: 50,
            technicalWeight: 30,
          }
        : {
            financialWeight: 0,
            passingMark: 0,
            technicalWeight: 0,
          }),
      selectionMethod: 'LPS',
      tenderId: id,
    };
    const bds_award = {
      negotiationAllowed: faker.datatype.boolean(),
      percentageQuantityDecreased: 8,
      percentageQuantityIncreased: 5,
      tenderId: id,
    };

    this.httpService.post(this.apiurlGeneral, bds_generals, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlPreparations, bds_Preparation, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlSubmission, bds_submissions, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlEvaluation, bds_evaluation, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlAward, bds_award, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  }

  private getRandomEnvelopType() {
    const enveloptype = ['single envelop', 'two envelop'];
    const index = faker.number.int({ min: 0, max: enveloptype.length - 1 });
    return enveloptype[index];
  }

  private getevaluationMethod() {
    const evaluationMethod = ['point system', 'compliance'];

    const index = faker.number.int({
      min: 0,
      max: evaluationMethod.length - 1,
    });
    return evaluationMethod[index];
  }

  private getAwardType() {
    const awardType = ['item based', 'lot based'];
    const index = faker.number.int({ min: 0, max: awardType.length - 1 });
    return awardType[index];
  }
}
