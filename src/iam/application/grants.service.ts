import { Injectable } from '@nestjs/common';
import { OnuryGrantDto } from './dto/onury-grant.dto';

@Injectable()
export class GrantsService {
  constructor() {}

  async findAllOnOnuryFormat(): Promise<OnuryGrantDto[]> {
    const roles: any[] = [];
    let onuryGrantListDto: OnuryGrantDto[] = [];

    roles.forEach((role) => {
      onuryGrantListDto = onuryGrantListDto.concat(
        role.grants.map((grant) => ({
          role: role.name,
          resource: grant.resource,
          action: grant.action,
          attributes: grant.attributes.join(','),
        })),
      );
    });

    return onuryGrantListDto;
  }
}
