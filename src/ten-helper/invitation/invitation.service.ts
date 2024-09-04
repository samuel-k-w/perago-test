import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { faker } from '@faker-js/faker';

@Injectable()
export class InvitationService {
  private readonly apiurlGeneralProvision =
    'https://dev-bo.megp.peragosystems.com/tendering/api/scc-general-provisions';
  private readonly apiurlDeliverable =
    'https://dev-bo.megp.peragosystems.com/tendering/api/scc-contract-deliverables';
  private readonly apiurlPaymentTerms =
    ' https://dev-bo.megp.peragosystems.com/tendering/api/scc-payment-terms';
  private readonly apiurlPaymentSchedules =
    'https://dev-bo.megp.peragosystems.com/tendering/api/scc-payment-schedules';
  private readonly apiurlGuarantees =
    'https://dev-bo.megp.peragosystems.com/tendering/api/scc-guarantees';
  private readonly apiurlLiabilities =
    'https://dev-bo.megp.peragosystems.com/tendering/api/scc-liabilities';
  //i include the invitation
  private readonly apiurlInvitation_P_fee =
    'https://dev-bo.megp.peragosystems.com/tendering/api/tender-participation-fees';

  constructor(private readonly httpService: HttpService) {}
  create(id: string, token: string) {
    const scc_general_provision = {
      commencementDay: 1,
      contractDuration: 2,
      contractType: 'turn key',
      deliverySite: '11 ',
      tenderId: id,
    };

    const scc_contract_deliverables = {
      deliverable: ['11c'],
      deliverySchedule: 2,
      tenderId: id,
    };

    const PaymentTerms = {
      advancePaymentAllowed: faker.datatype.boolean(),
      advancePaymentLimit: 0,
      contractCurrency: ['MWK'],
      latePaymentPenalty: 4,
      paymentMode: ['paymentMethodOne'],
      paymentReleasePeriod: 15,
      tenderId: id,
    };

    const PaymentSchedule = {
      order: 3,
      paymentPercentage: 5,
      paymentSchedule: '55',
      requiredDocuments: ['dd'],
      tenderId: id,
    };

    const liabilities = {
      liquidityDamage: 2,
      liquidityDamageLimit: 2,
      postWarrantyServicePeriod: 2,
      tenderId: id,
      warrantyPeriod: 2,
    };

    const Guarantees = {
      currency: 'INR',
      guaranteeForm: ['Bank Guarantee'],
      guaranteePercentage: 42,
      guaranteeRequired: faker.datatype.boolean(),
      guaranteeType: 'Advance Payment Guarantee',
      tenderId: id,
      validityPeriod: 45,
    };

    const ParticipationFee = {
      amount: faker.number.int({ min: 50000 }),
      currency: 'MWK',
      method: 'Bank',
      tenderId: id,
    };

    this.httpService.post(this.apiurlGeneralProvision, scc_general_provision, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlDeliverable, scc_contract_deliverables, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlPaymentTerms, PaymentTerms, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlPaymentSchedules, PaymentSchedule, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlLiabilities, liabilities, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.httpService.post(this.apiurlInvitation_P_fee, ParticipationFee, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'This action adds a new evaluation';
  }
}
