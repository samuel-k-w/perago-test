import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { faker } from '@faker-js/faker';

@Injectable()
export class TimelinesService {
  constructor(private httpService: HttpService) {}

  private readonly timelines = [
    'Procurement Initiation',
    'Procurement Requisition',
    'Tender Publication',
    'Tender Submission',
    'Evaluation',
    'Award',
    'Contract Signing',
    'Contract Closure',
  ];

  generateFakeBudgetData(id: string): any[] {
    const requisitions = [];
    let baseDate = new Date(); // Start from today

    this.timelines.forEach((timeline, index) => {
      const period = this.calculatePeriod(index);
      const dueDate = new Date(baseDate);
      dueDate.setDate(dueDate.getDate() + period);

      requisitions.push({
        procurementRequisitionId: id,
        dueDate: dueDate.toISOString(),
        period,
        timeline,
        order: index,
        appDueDate: baseDate.toISOString(),
      });

      baseDate = new Date(dueDate); // Update baseDate for next iteration
    });

    return requisitions;
  }

  private calculatePeriod(order: number): number {
    // Adjust periods based on the order
    // Example logic: periods increase with the order
    return 10 + order * 5;
  }

  sendFakeData(token: string, id: string): Observable<AxiosResponse<any>> {
    const fakeData = this.generateFakeBudgetData(id);
    return this.httpService.post(
      'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisition-timelines/bulk-create',
      fakeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
