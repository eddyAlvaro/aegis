import { Injectable } from '@nestjs/common';
import { GrantsService } from '../iam/application/grants.service';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class AccessControlService {
  constructor(
    private grantService: GrantsService,
    @InjectRolesBuilder() private rolesBuilder: RolesBuilder,
  ) {}

  async refreshSystemGrants() {
    const grants = await this.grantService.findAllOnOnuryFormat();
    this.rolesBuilder.setGrants(grants);
  }
}
