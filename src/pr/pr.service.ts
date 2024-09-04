import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IdentificationService } from '../pr-helper/identification/identification.service';
import { MethodService } from '../pr-helper/method/method.service';
import { ItemService } from '../pr-helper/item/item.service';
import { DocumentService } from '../pr-helper/document/document.service';
import { TimelinesService } from '../pr-helper/timelines/timelines.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PrService {
  constructor(
    private httpService: HttpService,
    private identificationService: IdentificationService,
    private readonly methodeService: MethodService,
    private readonly itemService: ItemService,
    private readonly documentService: DocumentService,
    private readonly timelineService: TimelinesService,
  ) {}

  private async getId(response): Promise<string> {
    const res = JSON.stringify(response.data);
    const jsonObject = JSON.parse(res);
    return jsonObject.id;
  }

  submit(token: string, id: string): Observable<AxiosResponse<any>> {
    return this.httpService.post(
      'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisitions/initiate-workflow',
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  private sleep(ms = 1000): Promise<void> {
    console.log('Kindly remember to remove `sleep`');
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async create(token: string) {
    const identification = await this.identificationService
      .sendFakeData(token)
      .toPromise();
    // await this.sleep();

    const id1 = await this.getId(identification);

    const method = await this.methodeService
      .sendFakeData(token, id1)
      .toPromise();

    // await this.sleep();

    const item = await this.itemService.sendFakeData(token, id1).toPromise();
    // await this.sleep();

    const timelines = await this.timelineService
      .sendFakeData(token, id1)
      .toPromise();
    // await this.sleep();

    const submit = await this.submit(token, id1).toPromise();

    return id1;
  }
}
