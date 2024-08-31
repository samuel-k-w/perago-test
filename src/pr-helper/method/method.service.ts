import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { faker } from '@faker-js/faker';

@Injectable()
export class MethodService {
  constructor(private httpService: HttpService) {}

  generateFakeBudgetData(id: string): object {
    return {
      tenantId: 0,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      deletedAt: null,
      organizationId: '4326f20b-ff3d-4868-bf43-1b76d2766740', // Generate a new UUID
      organizationName: 'Asssociation of Early Childhood Development in Malawi',
      fundingSource: 'Donor',
      procurementMethod: 'Request for Quotation (RFQ)',
      procurementType: 'Goods',
      donor: ['e6cf9774-9c65-4b63-bdac-f4ccba6e8734'],
      targetGroup: ['Marginalized Group'],
      isOnline: true,
      contract: {}, // Assuming empty object for simplicity
      procurementRequisitionId: id, // Generate a new UUID
      justification: [
        { key: 'procurementMethod', status: 'pass' },
        { key: 'targetGroup', status: 'pass' },
      ],
    };
  }

  sendFakeData(token: string, id: string): Observable<AxiosResponse<any>> {

    const fakeData = this.generateFakeBudgetData(id);

    return this.httpService.post(
      'https://dev-bo.megp.peragosystems.com/planning/api/procurement-mechanisms',
      fakeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
