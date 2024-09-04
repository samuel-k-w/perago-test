import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

export interface Requirement {
  bidFormId: string;
  category: string;
  itemId: string;
  requirement: string;
  requirementCondition: string;
  requirementType: string;
  sorType: string;
}

@Injectable()
export class EvaluationService {
  private readonly apiUrl =
    'https://dev-bo.megp.peragosystems.com/tendering/api/sor-technical-requirements';
  constructor(private readonly httpService: HttpService) {}

  private async sendTechnicalRequirement(data: any, id: string, token: string) {
    this.httpService.post(this.apiUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async create(id: string, token: string) {
    const requirements: Requirement[] = [
      {
        bidFormId: 'cc707afb-c76a-4a66-b807-8bcb1089132c',
        category: 'Electronic_Machine',
        itemId: '1f796613-82df-4bc7-a877-cbe7b98aad8c',
        requirement: 'INTER__lABTOP_S',
        requirementCondition: 'Must meet',
        requirementType: 'minimum',
        sorType: 'specification',
      },
      {
        bidFormId: 'cc707afb-c76a-4a66-b807-8bcb1089132c',
        category: 'laptop',
        itemId: '1f796613-82df-4bc7-a877-cbe7b98aad8c',
        requirement: 'INTER__lABTOP_D',
        requirementCondition: 'Has to meet',
        requirementType: 'exact',
        sorType: 'delivery',
      },
      {
        bidFormId: 'cc707afb-c76a-4a66-b807-8bcb1089132c',
        category: 'laptop',
        itemId: '1f796613-82df-4bc7-a877-cbe7b98aad8c',
        requirement: 'INTER__lABTOP_P',
        requirementCondition: 'Must meet',
        requirementType: 'minimum',
        sorType: 'packagingAndLabeling',
      },
      {
        bidFormId: 'cc707afb-c76a-4a66-b807-8bcb1089132c',
        category: 'laptop',
        itemId: '1f796613-82df-4bc7-a877-cbe7b98aad8c',
        requirement: 'INTER__lABTOP_W',
        requirementCondition: 'Has to meet',
        requirementType: 'exact',
        sorType: 'warrantyAndSupport',
      },
      {
        bidFormId: 'cc707afb-c76a-4a66-b807-8bcb1089132c',
        category: 'laptop',
        itemId: '1f796613-82df-4bc7-a877-cbe7b98aad8c',
        requirement: 'INTER__lABTOP_I',
        requirementCondition: 'Has to meet',
        requirementType: 'exact',
        sorType: 'incidentalRequirement',
      },
    ];

    for (const requirement of requirements) {
      await this.sendTechnicalRequirement(requirement, id, token);
    }
  }
}
