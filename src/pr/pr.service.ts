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

  async create() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MCwiaWQiOiJjMTAyOWYzMS1kNzkyLTRkZjMtYmQ4Ny1lMDhlMWEzNWI2M2IiLCJ1c2VybmFtZSI6Im11LWNhZnYyODc4IiwiZmlyc3ROYW1lIjoiVGFtcmF0IEIiLCJsYXN0TmFtZSI6IkFzc2VmYSIsImVtYWlsIjoidGFtbmV0NDQ0QGdtYWlsLmNvbSIsInBob25lIjpudWxsLCJpc1Bob25lVmVyaWZpZWQiOmZhbHNlLCJvcmdhbml6YXRpb25zIjpbeyJ1c2VySWQiOiJmOThlN2RkMS03MmJkLTQzYzMtOWRmNC1mNjQ0NDVkZTU2MmUiLCJvcmdhbml6YXRpb24iOnsiaWQiOiI0MzI2ZjIwYi1mZjNkLTQ4NjgtYmY0My0xYjc2ZDI3NjY3NDAiLCJuYW1lIjoiQXNzc29jaWF0aW9uIG9mIEVhcmx5IENoaWxkaG9vZCBEZXZlbG9wbWVudCBpbiBNYWxhd2kiLCJzaG9ydE5hbWUiOiJBRUNETSIsImNvZGUiOiJVUFdta2UiLCJwcmVmZXJlbnRpYWxUcmVhdG1lbnRzIjpudWxsfSwicGVybWlzc2lvbnMiOlsiZ3VhcmFudGVlOmFwcHJvdmVGb3JmZWl0bWVudCIsImd1YXJhbnRlZTp2aWV3Rm9yZmVpdG1lbnQiLCJndWFyYW50ZWU6dmlld1JlbGVhc2UiLCJndWFyYW50ZWU6cmVqZWN0UmVxdWVzdCIsImd1YXJhbnRlZTphcHByb3ZlUmVxdWVzdCIsImd1YXJhbnRlZTp2aWV3UmVxdWVzdCIsImd1YXJhbnRlZTpmb3JmZWl0R3VhcmFudGVlIiwiZ3VhcmFudGVlOnJlbGVhc2VHdWFyYW50ZWUiLCJndWFyYW50ZWU6dmlld0d1YXJhbnRlZSIsImd1YXJhbnRlZTp2aWV3QmlkU2VjdXJpdHkiLCJpYW06dXNlciIsImlhbTptYW5hZ2VPcmdhbml6YXRpb24iLCJpYW06bWFuZGF0ZVZpZXdlciIsInBsYW5uaW5nOnJldmlld1Byb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VBcHByb3ZlZEl0ZW0iLCJpYW06cm9sZSIsImlhbTp1bml0IiwicGxhbm5pbmc6YXBwcm92ZVByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzpjcmVhdGVQcm9jdXJlbWVudFJlcXVpc2l0aW9uIiwicGxhbm5pbmc6cmV2aWV3UHJvY3VyZW1lbnRSZXF1aXNpdGlvbiIsInBsYW5uaW5nOnN1Ym1pdFByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VJdGVtc09uUFIiLCJwbGFubmluZzpidWRnZXRWZXJpZmljYXRpb24iLCJwbGFubmluZzptYW5hZ2VBcHByb3ZlZEl0ZW0iLCJwbGFubmluZzphcHByb3ZlUHJlUGxhbiIsInBsYW5uaW5nOmFwcHJvdmVQb3N0UGxhbiIsInBsYW5uaW5nOnN1Ym1pdFBvc3RQbGFuIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5BY3Rpdml0eSIsInBsYW5uaW5nOm1hbmFnZVBvc3RQbGFuIiwicGxhbm5pbmc6c3VibWl0UHJlUGxhbiIsInBsYW5uaW5nOm1hbmFnZVByZVBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbkFjdGl2aXR5IiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbiIsInBsYW5uaW5nOmNyZWF0ZVByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VCdWRnZXQiLCJwbGFubmluZzphcHByb3ZlQnVkZ2V0IiwicGxhbm5pbmc6bWFuYWdlQXBwcm92ZWRBY3Rpdml0eSIsInBsYW5uaW5nOnBsYW5uaW5nIiwiaWFtOnVzZXIiLCJpYW06bWFuYWdlT3JnYW5pemF0aW9uIiwiaWFtOm1hbmRhdGVWaWV3ZXIiLCJpYW06Z3JvdXAiLCJpYW06cm9sZSIsImlhbTp1bml0IiwicGxhbm5pbmc6c3VibWl0UHJlUGxhbiIsInBsYW5uaW5nOm1hbmFnZVByZVBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbkFjdGl2aXR5IiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbiIsInBsYW5uaW5nOnN1Ym1pdFBvc3RQbGFuIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5BY3Rpdml0eSIsInBsYW5uaW5nOm1hbmFnZVBvc3RQbGFuIiwicGxhbm5pbmc6YnVkZ2V0VmVyaWZpY2F0aW9uIiwicGxhbm5pbmc6dmlld1Bvc3RQbGFuIiwicGxhbm5pbmc6dmlld1JldmlzZVBvc3RQbGFuIiwicGxhbm5pbmc6YXBwcm92ZVByZVBsYW4iLCJwbGFubmluZzphcHByb3ZlUG9zdFBsYW4iLCJwbGFubmluZzptYW5hZ2VCdWRnZXQiLCJpYW06bWFuYWdlU3VwZXJBZG1pbiIsInBsYW5uaW5nOnN1Ym1pdFByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VJdGVtc09uUFIiLCJndWFyYW50ZWU6YXBwcm92ZUZvcmZlaXRtZW50IiwiZ3VhcmFudGVlOnZpZXdGb3JmZWl0bWVudCIsImd1YXJhbnRlZTp2aWV3UmVsZWFzZSIsImd1YXJhbnRlZTpyZWplY3RSZXF1ZXN0IiwiZ3VhcmFudGVlOmFwcHJvdmVSZXF1ZXN0IiwiZ3VhcmFudGVlOnZpZXdSZXF1ZXN0IiwiZ3VhcmFudGVlOmFwcHJvdmVGb3JmZWl0bWVudCIsImd1YXJhbnRlZTp2aWV3Rm9yZmVpdG1lbnQiLCJndWFyYW50ZWU6dmlld1JlbGVhc2UiLCJndWFyYW50ZWU6cmVqZWN0UmVxdWVzdCIsImd1YXJhbnRlZTphcHByb3ZlUmVxdWVzdCIsImd1YXJhbnRlZTp2aWV3UmVxdWVzdCJdLCJyb2xlU3lzdGVtcyI6WyJPUkdBTklaQVRJT05fQURNSU5JU1RSQVRPUiIsIlBSRV9CVURHRVRfUExBTl9DUkVBVE9SIiwiUE9TVF9CVURHRVRfUExBTl9DUkVBVE9SIiwiUFBEQV9QTEFOX0FQUFJPVkVSIiwiQlVER0VUX09GRklDRVIiLCJSRVFVSVNJVElPTkVSIiwiR1VBUkFOVEVFX09GRklDRVIiLCJHVUFSQU5URUVfQVBQUk9WRVIiXSwiYXBwbGljYXRpb25zIjpbImd1YXJhbnRlZSIsImlhbSIsInBsYW5uaW5nIl19XSwiaWF0IjoxNzI1MDk1NTYyLCJleHAiOjE3MjUxODE5NjJ9.9aHYQACkd_v9GeCfzZBuzCFYVBxG9T0JRAofcnBKO8M';
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

    return {
      status: submit.status,
      data: submit.data,
    };
  }
}
