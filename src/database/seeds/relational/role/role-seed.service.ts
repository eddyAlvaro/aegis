import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  GlobalType,
  RoleEntity,
} from '../../../../iam/infrastructure/persistence/relational/entities/role.entity';
import { SystemRole } from '../../../../iam/domain/system-role';
import { RoleStatus } from '../../../../modules/role-configuration/domain/types/role-status';
import { SeedService } from '@src/platform/migrations/SeedService';
import { getGrantIdList } from '@src/modules/role-configuration/domain/types/grants';

@Injectable()
export class RoleSeedService extends SeedService {
  runCommon(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  runProduction(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  runStaging(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  runDevelopment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(RoleEntity)
    private typeOrmRoleRepository: Repository<RoleEntity>,
  ) {
    super();
  }

  async run() {
    const countSuperAdmin = await this.typeOrmRoleRepository.count({
      where: {
        id: SystemRole.SuperAdmin,
      },
    });

    if (!countSuperAdmin) {
      await this.typeOrmRoleRepository.save(this.superAdmin);
    }

    const countPlatformAdmin = await this.typeOrmRoleRepository.count({
      where: {
        id: SystemRole.PlatformAdmin,
      },
    });

    if (!countPlatformAdmin) {
      await this.typeOrmRoleRepository.save(this.platformAdmin);
    }

    const countOrganizationAdmin = await this.typeOrmRoleRepository.count({
      where: {
        id: SystemRole.OrganizationAdmin,
      },
    });

    if (!countOrganizationAdmin) {
      await this.typeOrmRoleRepository.save(
        this.typeOrmRoleRepository.create(this.organizationAdmin),
      );
    }

    const countOrganizationUser = await this.typeOrmRoleRepository.count({
      where: {
        id: SystemRole.OrganizationUser,
      },
    });

    if (!countOrganizationUser) {
      await this.typeOrmRoleRepository.save(
        this.typeOrmRoleRepository.create(this.organizationUser),
      );
    }

    const countPlatformUser = await this.typeOrmRoleRepository.count({
      where: {
        id: SystemRole.PlatformUser,
      },
    });

    if (!countPlatformUser) {
      await this.typeOrmRoleRepository.save(
        this.typeOrmRoleRepository.create(this.platformUser),
      );
    }

    const platformAdminList = await this.typeOrmRoleRepository.find({
      where: {
        id: In([SystemRole.PlatformAdmin, SystemRole.SuperAdmin]),
      },
    });
    platformAdminList.forEach((platformAdmin) => {
      platformAdmin.grantIds = getGrantIdList('platform');
    });
    await this.typeOrmRoleRepository.save(platformAdminList);

    const organizationAdminList = await this.typeOrmRoleRepository.find({
      where: {
        id: SystemRole.OrganizationAdmin,
      },
    });

    organizationAdminList.forEach((organizationAdmin) => {
      organizationAdmin.grantIds = getGrantIdList('organization');
    });
    await this.typeOrmRoleRepository.save(organizationAdminList);
  }

  superAdmin: RoleEntity = this.typeOrmRoleRepository.create({
    id: SystemRole.SuperAdmin,
    name: 'Super Administrador',
    isSystem: true,
    grantIds: getGrantIdList('platform'),
    deletedAt: null,
    type: GlobalType.Platform,
    description: '',
    users: [],
    status: RoleStatus.Active,
  });
  platformAdmin: RoleEntity = this.typeOrmRoleRepository.create({
    id: SystemRole.PlatformAdmin,
    name: 'Administrador de plataforma',
    isSystem: true,
    grantIds: getGrantIdList('platform'),
    deletedAt: null,
    type: GlobalType.Platform,
    description: '',
    users: [],
    status: RoleStatus.Active,
  });
  platformUser: RoleEntity = this.typeOrmRoleRepository.create({
    id: SystemRole.PlatformUser,
    name: 'Usuario de plataforma',
    isSystem: true,
    grantIds: [],
    deletedAt: null,
    type: GlobalType.Platform,
    description: '',
    users: [],
    status: RoleStatus.Active,
  });
  organizationUser: RoleEntity = this.typeOrmRoleRepository.create({
    id: SystemRole.OrganizationUser,
    name: 'Usuario de organización',
    isSystem: true,
    grantIds: [],
    deletedAt: null,
    description: '',
    type: GlobalType.Organization,
    users: [],
    status: RoleStatus.Active,
  });
  organizationAdmin: RoleEntity = this.typeOrmRoleRepository.create({
    id: SystemRole.OrganizationAdmin,
    name: 'Administrador de organización',
    isSystem: true,
    grantIds: getGrantIdList('organization'),
    type: GlobalType.Organization,
    deletedAt: null,
    description: '',
    users: [],
    status: RoleStatus.Active,
  });
}
