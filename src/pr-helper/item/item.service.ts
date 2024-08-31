import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { faker } from '@faker-js/faker';

@Injectable()
export class ItemService {
  constructor(private httpService: HttpService) {}

  generateFakeBudgetData(id1: string): object[] {
    const numberOfItems = 5; // or any number you want for the bulk create
    const items = [];

    for (let i = 0; i < numberOfItems; i++) {
      items.push({
        unitPrice: faker.commerce.price(10, 100, 2),
        currency: 'MKW',
        quantity: 5,
        uom: 'centi gram',
        procurementRequisitionId: id1,
        description: faker.commerce.productName(),
        metaData: {
          id: 0,
          unitPrice: faker.commerce.price(10, 100, 2),
          currency: 'MKW',
          quantity: 5,
          uoM: '7a4f120d-aa1d-4888-a7e9-3fd5b7de28ad',
          uom: 'centi gram',
          description: faker.commerce.productName(),
          procurementRequisitionId: id1,
          itemCode: '85673353-00211',
          measurement: '40209215-baeb-4342-ad71-36cacc63df3d',
          classification: '85673353',
        },
        itemCode: '85673353-00211',
        measurement: '40209215-baeb-4342-ad71-36cacc63df3d',
        classification: '85673353',
      });
    }

    return items;
  }

  sendFakeData(token: string, id1: string): Observable<AxiosResponse<any>> {
    const fakeData = this.generateFakeBudgetData(id1);
    return this.httpService.post(
      'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisition-items/bulk-create',
      fakeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
