import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SimpleDomainFailure } from '@src/modules/shared-kernel/domain/failures/shared-kernel.failures';
import { KpiPlatformParamsDto } from '@src/platform/api/kpi-platform.request.dto';

export const ExtractOrganizationIds = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string[] => {
    const request = ctx.switchToHttp().getRequest();
    const bodyParams = request.body as KpiPlatformParamsDto;
    const organizationIds: string[] = [];

    if (request.type === 'platform') {
      organizationIds.push(...(bodyParams.organizationIds || []));
    }

    if (request.type === 'organization') {
      organizationIds.push(...request.availableOrganizationIdList);
    }

    if (organizationIds.length === 0) {
      throw new SimpleDomainFailure('Deben seleccionarse organizaciones');
    }

    return organizationIds;
  },
);
