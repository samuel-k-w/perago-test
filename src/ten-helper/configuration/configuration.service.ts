import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigurationService {
  urlStandardProcurementDocument =
    'https://dev-bo.megp.peragosystems.com/tendering/api/tender-personals';
  urlPersonnelList =
    'https://dev-bo.megp.peragosystems.com/tendering/api/tender-spd';

  constructor(private httpService: HttpService) {}

  create(token: string, id: string) {
    const standardProcurementDocument = {
      evaluated: false,
      order: 20,
      position: 'my-position_test',
      // tenderId:faker.string.uuid(),
      tenderId: id,
    };

    const personnelList = {
      spdId: '831622bc-af08-48c8-a297-b102f5ec45f0',
      tenderId: id,
    };

    const procurementMechanism = {
      invitationType: 'open',
      marketApproach: 'national',
      stage: 1,
      stageType: 'single',
      tenderId: id,
      PRProcurementMechanisms: {},
    };

    this.httpService.post(
      this.urlStandardProcurementDocument,
      standardProcurementDocument,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    this.httpService.post(this.urlPersonnelList, personnelList, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
