import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { faker } from '@faker-js/faker';

@Injectable()
export class IdentificationService {
  constructor(private httpService: HttpService) {}

  generateFakeBudgetData(): object {
    return {
      budgetId: '7574b4bb-91a7-4489-823d-e73dff3e5ed5',
      budgetYearId: '28974b42-9b86-45d6-b301-69496456dac6',
      currency: 'MKW',
      description: faker.lorem.words(10),
      isMultiYear: faker.datatype.boolean(),
      name: `by samuel entern: ${faker.commerce.productName()}`,
      procurementApplication: 'tendering',
      remark: faker.lorem.sentence(),
      totalEstimatedAmount: faker.datatype.number({
        min: 10000000,
        max: 999999999,
      }),
      type: 'Others',
    };
  }

  sendFakeData(token: string): Observable<AxiosResponse<any>> {
    const fakeData = this.generateFakeBudgetData();

    return this.httpService.post(
      'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisitions',
      fakeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
