import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { faker } from '@faker-js/faker';
import * as FormData from 'form-data';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentService {
  constructor(private httpService: HttpService) {}
  async sendFakeData(id: string): Promise<void> {

    const presignedUrl = 'https://files.megp.peragosystems.com/megp/8751c0f6-05bb-4585-953e-ec5193bb69d5.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Szzt6Zo5yEJCfa7ay5sy%2F20240805%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240805T060907Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host&X-Amz-Signature=4a6ef0a4e47723595deddfd651ad8d8797fd4b386dec663004b1e7f02a170154'; // Replace with your actual pre-signed URL
    const filePath = '(C:\\Users\\ms\\Documents\\Downloads\\perago-test\\src\\pr-helper\\document\\Pytho Lab-3 Exercise-1.pdf';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MCwiaWQiOiJjMTAyOWYzMS1kNzkyLTRkZjMtYmQ4Ny1lMDhlMWEzNWI2M2IiLCJ1c2VybmFtZSI6Im11LWNhZnYyODc4IiwiZmlyc3ROYW1lIjoiVGFtcmF0IEIiLCJsYXN0TmFtZSI6IkFzc2VmYSIsImVtYWlsIjoidGFtbmV0NDQ0QGdtYWlsLmNvbSIsInBob25lIjpudWxsLCJpc1Bob25lVmVyaWZpZWQiOmZhbHNlLCJvcmdhbml6YXRpb25zIjpbeyJ1c2VySWQiOiJmOThlN2RkMS03MmJkLTQzYzMtOWRmNC1mNjQ0NDVkZTU2MmUiLCJvcmdhbml6YXRpb24iOnsiaWQiOiI0MzI2ZjIwYi1mZjNkLTQ4NjgtYmY0My0xYjc2ZDI3NjY3NDAiLCJuYW1lIjoiQXNzc29jaWF0aW9uIG9mIEVhcmx5IENoaWxkaG9vZCBEZXZlbG9wbWVudCBpbiBNYWxhd2kiLCJzaG9ydE5hbWUiOiJBRUNETSIsImNvZGUiOiJVUFdta2UiLCJwcmVmZXJlbnRpYWxUcmVhdG1lbnRzIjpudWxsfSwicGVybWlzc2lvbnMiOlsicGxhbm5pbmc6cmV2aWV3UHJvY3VyZW1lbnRSZXF1aXNpdGlvbiIsInBsYW5uaW5nOnN1Ym1pdFByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VJdGVtc09uUFIiLCJwbGFubmluZzpidWRnZXRWZXJpZmljYXRpb24iLCJwbGFubmluZzptYW5hZ2VBcHByb3ZlZEl0ZW0iLCJwbGFubmluZzphcHByb3ZlUHJlUGxhbiIsInBsYW5uaW5nOmFwcHJvdmVQb3N0UGxhbiIsInBsYW5uaW5nOnN1Ym1pdFBvc3RQbGFuIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5BY3Rpdml0eSIsInBsYW5uaW5nOm1hbmFnZVBvc3RQbGFuIiwicGxhbm5pbmc6c3VibWl0UHJlUGxhbiIsInBsYW5uaW5nOm1hbmFnZVByZVBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbkFjdGl2aXR5IiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbiIsInBsYW5uaW5nOmNyZWF0ZVByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VCdWRnZXQiLCJwbGFubmluZzphcHByb3ZlQnVkZ2V0IiwicGxhbm5pbmc6bWFuYWdlQXBwcm92ZWRBY3Rpdml0eSIsInBsYW5uaW5nOnBsYW5uaW5nIiwiaWFtOnVzZXIiLCJpYW06bWFuYWdlT3JnYW5pemF0aW9uIiwiaWFtOm1hbmRhdGVWaWV3ZXIiLCJwbGFubmluZzpyZXZpZXdQcm9jdXJlbWVudFJlcXVpc2l0aW9uIiwicGxhbm5pbmc6bWFuYWdlQXBwcm92ZWRJdGVtIiwiaWFtOnJvbGUiLCJpYW06dW5pdCIsInBsYW5uaW5nOmFwcHJvdmVQcm9jdXJlbWVudFJlcXVpc2l0aW9uIiwicGxhbm5pbmc6Y3JlYXRlUHJvY3VyZW1lbnRSZXF1aXNpdGlvbiIsImd1YXJhbnRlZTphcHByb3ZlRm9yZmVpdG1lbnQiLCJndWFyYW50ZWU6dmlld0ZvcmZlaXRtZW50IiwiZ3VhcmFudGVlOnZpZXdSZWxlYXNlIiwiZ3VhcmFudGVlOnJlamVjdFJlcXVlc3QiLCJndWFyYW50ZWU6YXBwcm92ZVJlcXVlc3QiLCJndWFyYW50ZWU6dmlld1JlcXVlc3QiLCJndWFyYW50ZWU6Zm9yZmVpdEd1YXJhbnRlZSIsImd1YXJhbnRlZTpyZWxlYXNlR3VhcmFudGVlIiwiZ3VhcmFudGVlOnZpZXdHdWFyYW50ZWUiLCJndWFyYW50ZWU6dmlld0JpZFNlY3VyaXR5IiwiaWFtOnVzZXIiLCJpYW06bWFuYWdlT3JnYW5pemF0aW9uIiwiaWFtOm1hbmRhdGVWaWV3ZXIiLCJpYW06Z3JvdXAiLCJpYW06cm9sZSIsImlhbTp1bml0IiwicGxhbm5pbmc6c3VibWl0UHJlUGxhbiIsInBsYW5uaW5nOm1hbmFnZVByZVBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbkFjdGl2aXR5IiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbiIsInBsYW5uaW5nOnN1Ym1pdFBvc3RQbGFuIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5BY3Rpdml0eSIsInBsYW5uaW5nOm1hbmFnZVBvc3RQbGFuIiwicGxhbm5pbmc6YnVkZ2V0VmVyaWZpY2F0aW9uIiwicGxhbm5pbmc6dmlld1Bvc3RQbGFuIiwicGxhbm5pbmc6dmlld1JldmlzZVBvc3RQbGFuIiwicGxhbm5pbmc6YXBwcm92ZVByZVBsYW4iLCJwbGFubmluZzphcHByb3ZlUG9zdFBsYW4iLCJwbGFubmluZzptYW5hZ2VCdWRnZXQiLCJpYW06bWFuYWdlU3VwZXJBZG1pbiIsInBsYW5uaW5nOnN1Ym1pdFByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VJdGVtc09uUFIiLCJndWFyYW50ZWU6YXBwcm92ZUZvcmZlaXRtZW50IiwiZ3VhcmFudGVlOnZpZXdGb3JmZWl0bWVudCIsImd1YXJhbnRlZTp2aWV3UmVsZWFzZSIsImd1YXJhbnRlZTpyZWplY3RSZXF1ZXN0IiwiZ3VhcmFudGVlOmFwcHJvdmVSZXF1ZXN0IiwiZ3VhcmFudGVlOnZpZXdSZXF1ZXN0IiwiZ3VhcmFudGVlOmFwcHJvdmVGb3JmZWl0bWVudCIsImd1YXJhbnRlZTp2aWV3Rm9yZmVpdG1lbnQiLCJndWFyYW50ZWU6dmlld1JlbGVhc2UiLCJndWFyYW50ZWU6cmVqZWN0UmVxdWVzdCIsImd1YXJhbnRlZTphcHByb3ZlUmVxdWVzdCIsImd1YXJhbnRlZTp2aWV3UmVxdWVzdCJdLCJyb2xlU3lzdGVtcyI6WyJPUkdBTklaQVRJT05fQURNSU5JU1RSQVRPUiIsIlBSRV9CVURHRVRfUExBTl9DUkVBVE9SIiwiUE9TVF9CVURHRVRfUExBTl9DUkVBVE9SIiwiUFBEQV9QTEFOX0FQUFJPVkVSIiwiQlVER0VUX09GRklDRVIiLCJSRVFVSVNJVElPTkVSIiwiR1VBUkFOVEVFX0FQUFJPVkVSIiwiR1VBUkFOVEVFX09GRklDRVIiXSwiYXBwbGljYXRpb25zIjpbInBsYW5uaW5nIiwiaWFtIiwiZ3VhcmFudGVlIl19XSwiaWF0IjoxNzIyODM2MTE2LCJleHAiOjE3MjI5MjI1MTZ9.ME7Ss_6bniEXtgKul26xraWefGeponxcCGHqzGHOwek'

    try {
      // Read the file data
      const fileData = fs.readFileSync(path.resolve(filePath));
      console.log()

      // Make a PUT request to the pre-signed URL to upload the file
      await this.httpService.put(presignedUrl, fileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/pdf', // Adjust the content type according to your file
        },
      });

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}

/*
generateFakeBudgetData(id: string): any {
    const originalname = `${faker.system.commonFileName}.pdf`; // Generate a fake filename with .pdf extension
    const contentType = 'application/pdf'; // Fixed content type for PDF
    const procurementRequisitionId = id; // Generate a random UUID
    const title = faker.lorem.words(3); // Generate a short title

    return {
      fileInfo: {
        originalname,
        contentType,
      },
      procurementRequisitionId,
      title,
    };
  }

  sendFakeData(id: string): Observable<AxiosResponse<any>> {
    const fakeData = this.generateFakeBudgetData(id);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MCwiaWQiOiJjMTAyOWYzMS1kNzkyLTRkZjMtYmQ4Ny1lMDhlMWEzNWI2M2IiLCJ1c2VybmFtZSI6Im11LWNhZnYyODc4IiwiZmlyc3ROYW1lIjoiVGFtcmF0IEIiLCJsYXN0TmFtZSI6IkFzc2VmYSIsImVtYWlsIjoidGFtbmV0NDQ0QGdtYWlsLmNvbSIsInBob25lIjpudWxsLCJpc1Bob25lVmVyaWZpZWQiOmZhbHNlLCJvcmdhbml6YXRpb25zIjpbeyJ1c2VySWQiOiJmOThlN2RkMS03MmJkLTQzYzMtOWRmNC1mNjQ0NDVkZTU2MmUiLCJvcmdhbml6YXRpb24iOnsiaWQiOiI0MzI2ZjIwYi1mZjNkLTQ4NjgtYmY0My0xYjc2ZDI3NjY3NDAiLCJuYW1lIjoiQXNzc29jaWF0aW9uIG9mIEVhcmx5IENoaWxkaG9vZCBEZXZlbG9wbWVudCBpbiBNYWxhd2kiLCJzaG9ydE5hbWUiOiJBRUNETSIsImNvZGUiOiJVUFdta2UiLCJwcmVmZXJlbnRpYWxUcmVhdG1lbnRzIjpudWxsfSwicGVybWlzc2lvbnMiOlsicGxhbm5pbmc6cmV2aWV3UHJvY3VyZW1lbnRSZXF1aXNpdGlvbiIsInBsYW5uaW5nOnN1Ym1pdFByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VJdGVtc09uUFIiLCJwbGFubmluZzpidWRnZXRWZXJpZmljYXRpb24iLCJwbGFubmluZzptYW5hZ2VBcHByb3ZlZEl0ZW0iLCJwbGFubmluZzphcHByb3ZlUHJlUGxhbiIsInBsYW5uaW5nOmFwcHJvdmVQb3N0UGxhbiIsInBsYW5uaW5nOnN1Ym1pdFBvc3RQbGFuIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5BY3Rpdml0eSIsInBsYW5uaW5nOm1hbmFnZVBvc3RQbGFuIiwicGxhbm5pbmc6c3VibWl0UHJlUGxhbiIsInBsYW5uaW5nOm1hbmFnZVByZVBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbkFjdGl2aXR5IiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbiIsInBsYW5uaW5nOmNyZWF0ZVByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VCdWRnZXQiLCJwbGFubmluZzphcHByb3ZlQnVkZ2V0IiwicGxhbm5pbmc6bWFuYWdlQXBwcm92ZWRBY3Rpdml0eSIsInBsYW5uaW5nOnBsYW5uaW5nIiwiaWFtOnVzZXIiLCJpYW06bWFuYWdlT3JnYW5pemF0aW9uIiwiaWFtOm1hbmRhdGVWaWV3ZXIiLCJwbGFubmluZzpyZXZpZXdQcm9jdXJlbWVudFJlcXVpc2l0aW9uIiwicGxhbm5pbmc6bWFuYWdlQXBwcm92ZWRJdGVtIiwiaWFtOnJvbGUiLCJpYW06dW5pdCIsInBsYW5uaW5nOmFwcHJvdmVQcm9jdXJlbWVudFJlcXVpc2l0aW9uIiwicGxhbm5pbmc6Y3JlYXRlUHJvY3VyZW1lbnRSZXF1aXNpdGlvbiIsImd1YXJhbnRlZTphcHByb3ZlRm9yZmVpdG1lbnQiLCJndWFyYW50ZWU6dmlld0ZvcmZlaXRtZW50IiwiZ3VhcmFudGVlOnZpZXdSZWxlYXNlIiwiZ3VhcmFudGVlOnJlamVjdFJlcXVlc3QiLCJndWFyYW50ZWU6YXBwcm92ZVJlcXVlc3QiLCJndWFyYW50ZWU6dmlld1JlcXVlc3QiLCJndWFyYW50ZWU6Zm9yZmVpdEd1YXJhbnRlZSIsImd1YXJhbnRlZTpyZWxlYXNlR3VhcmFudGVlIiwiZ3VhcmFudGVlOnZpZXdHdWFyYW50ZWUiLCJndWFyYW50ZWU6dmlld0JpZFNlY3VyaXR5IiwiaWFtOnVzZXIiLCJpYW06bWFuYWdlT3JnYW5pemF0aW9uIiwiaWFtOm1hbmRhdGVWaWV3ZXIiLCJpYW06Z3JvdXAiLCJpYW06cm9sZSIsImlhbTp1bml0IiwicGxhbm5pbmc6c3VibWl0UHJlUGxhbiIsInBsYW5uaW5nOm1hbmFnZVByZVBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbkFjdGl2aXR5IiwicGxhbm5pbmc6bWFuYWdlUHJlUGxhbiIsInBsYW5uaW5nOnN1Ym1pdFBvc3RQbGFuIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5JdGVtIiwicGxhbm5pbmc6bWFuYWdlUG9zdFBsYW5BY3Rpdml0eSIsInBsYW5uaW5nOm1hbmFnZVBvc3RQbGFuIiwicGxhbm5pbmc6YnVkZ2V0VmVyaWZpY2F0aW9uIiwicGxhbm5pbmc6dmlld1Bvc3RQbGFuIiwicGxhbm5pbmc6dmlld1JldmlzZVBvc3RQbGFuIiwicGxhbm5pbmc6YXBwcm92ZVByZVBsYW4iLCJwbGFubmluZzphcHByb3ZlUG9zdFBsYW4iLCJwbGFubmluZzptYW5hZ2VCdWRnZXQiLCJpYW06bWFuYWdlU3VwZXJBZG1pbiIsInBsYW5uaW5nOnN1Ym1pdFByb2N1cmVtZW50UmVxdWlzaXRpb24iLCJwbGFubmluZzptYW5hZ2VJdGVtc09uUFIiLCJndWFyYW50ZWU6YXBwcm92ZUZvcmZlaXRtZW50IiwiZ3VhcmFudGVlOnZpZXdGb3JmZWl0bWVudCIsImd1YXJhbnRlZTp2aWV3UmVsZWFzZSIsImd1YXJhbnRlZTpyZWplY3RSZXF1ZXN0IiwiZ3VhcmFudGVlOmFwcHJvdmVSZXF1ZXN0IiwiZ3VhcmFudGVlOnZpZXdSZXF1ZXN0IiwiZ3VhcmFudGVlOmFwcHJvdmVGb3JmZWl0bWVudCIsImd1YXJhbnRlZTp2aWV3Rm9yZmVpdG1lbnQiLCJndWFyYW50ZWU6dmlld1JlbGVhc2UiLCJndWFyYW50ZWU6cmVqZWN0UmVxdWVzdCIsImd1YXJhbnRlZTphcHByb3ZlUmVxdWVzdCIsImd1YXJhbnRlZTp2aWV3UmVxdWVzdCJdLCJyb2xlU3lzdGVtcyI6WyJPUkdBTklaQVRJT05fQURNSU5JU1RSQVRPUiIsIlBSRV9CVURHRVRfUExBTl9DUkVBVE9SIiwiUE9TVF9CVURHRVRfUExBTl9DUkVBVE9SIiwiUFBEQV9QTEFOX0FQUFJPVkVSIiwiQlVER0VUX09GRklDRVIiLCJSRVFVSVNJVElPTkVSIiwiR1VBUkFOVEVFX0FQUFJPVkVSIiwiR1VBUkFOVEVFX09GRklDRVIiXSwiYXBwbGljYXRpb25zIjpbInBsYW5uaW5nIiwiaWFtIiwiZ3VhcmFudGVlIl19XSwiaWF0IjoxNzIyODM2MTE2LCJleHAiOjE3MjI5MjI1MTZ9.ME7Ss_6bniEXtgKul26xraWefGeponxcCGHqzGHOwek'


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
 */

/*
async uploadFileDirectly(id: string): Promise<any> {
    const form = new FormData();

    const fileUrl =
      'https://files.megp.peragosystems.com/megp/8751c0f6-05bb-4585-953e-ec5193bb69d5.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Szzt6Zo5yEJCfa7ay5sy%2F20240805%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240805T060907Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host&X-Amz-Signature=4a6ef0a4e47723595deddfd651ad8d8797fd4b386dec663004b1e7f02a170154';
    // Add additional fields to the form
    form.append(
      'fileInfo',
      JSON.stringify({
        originalname: 'Pytho Lab-3 Exercise-1.pdf',
        contentType: 'application/pdf',
      }),
    );
    form.append('procurementRequisitionId', id);
    form.append('title', 'new doc');

    // Get the file stream from the original URL and append it to the form
    const response = await axios.get(fileUrl, { responseType: 'stream' });
    form.append('file', response.data, {
      filename: 'Pytho Lab-3 Exercise-1.pdf',
      contentType: 'application/pdf',
    });

    // Upload the form with the file to the target endpoint
    const uploadResponse = await axios.post(
      'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisition-documents/upload',
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      },
    );

    return uploadResponse.data;
  }
 */
