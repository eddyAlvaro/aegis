import { UserNotAuthorized } from '@src/modules/shared-kernel/domain/failures/shared-kernel.failures';
import { FilterOptions } from '@src/platform/ddd';

export const ensurOrganizationSimple = (
  entryAvailableOrganizationIdList: string[],
  requestOrganizationList: string[],
) => {
  if (
    !entryAvailableOrganizationIdList.some((id) =>
      requestOrganizationList.includes(id),
    )
  ) {
    throw new UserNotAuthorized();
  }
};

// export const ensureOrganizationFiltering = (
//   entryAvailableOrganizationIdList: string[],
//   filterOptions: FilterOptions[] | undefined,
// ): FilterOptions[] => {
//   const defaultFilter: FilterOptions = {
//     field: 'organization.id',
//     type: 'in',
//     value: entryAvailableOrganizationIdList,
//   };
//   const entryFilterOptions = [defaultFilter, ...(filterOptions || [])] || [
//     defaultFilter,
//   ];
//   const availableOrganizationIdList: string[] =
//     entryAvailableOrganizationIdList || [];
//   entryFilterOptions.forEach((entryFilterOption) => {
//     const field = entryFilterOption.field;
//     const value = entryFilterOption.value;
//     if (field === 'organization.id' && availableOrganizationIdList.length > 0) {
//       if (Array.isArray(value)) {
//         if (!availableOrganizationIdList.some((id) => value.includes(id))) {
//           throw new UserNotAuthorized();
//         }
//       } else if (!availableOrganizationIdList.includes(String(value))) {
//         throw new UserNotAuthorized();
//       }
//     }
//   });

//   return entryFilterOptions;
// };

// export const ensureOrganizationMultipleFiltering = (
//   entryAvailableOrganizationIdList: string[],
//   filterOptions: FilterOptions[] | undefined,
// ): FilterOptions[] => {
//   const defaultFilter: FilterOptions = {
//     field: 'organizations.id',
//     type: 'in',
//     value: entryAvailableOrganizationIdList,
//   };
//   const entryFilterOptions = [defaultFilter, ...(filterOptions || [])] || [
//     defaultFilter,
//   ];
//   const availableOrganizationIdList: string[] =
//     entryAvailableOrganizationIdList || [];
//   entryFilterOptions.forEach((entryFilterOption) => {
//     const field = entryFilterOption.field;
//     const value = entryFilterOption.value;
//     if (field === 'organization.id' && availableOrganizationIdList.length > 0) {
//       if (Array.isArray(value)) {
//         if (!availableOrganizationIdList.some((id) => value.includes(id))) {
//           throw new UserNotAuthorized();
//         }
//       } else if (!availableOrganizationIdList.includes(String(value))) {
//         throw new UserNotAuthorized();
//       }
//     }
//   });

//   return entryFilterOptions;
// };

export const ensureOrganizationRaw = (
  entryAvailableOrganizationIdList: string[],
  filterOptions: string[],
): string[] => {
  if (
    !entryAvailableOrganizationIdList.some((id) => filterOptions.includes(id))
  ) {
    throw new UserNotAuthorized();
  }

  return entryAvailableOrganizationIdList;
};
