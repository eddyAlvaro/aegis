// import { EventStatus } from '../../../modules/event-management/domain/types/event-status';
import { FilterOptions } from '../../ddd';

export const generateDefaultMonths = (
  startDate: Date,
  endDate: Date,
): string[] => {
  const months: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const month = currentDate.toLocaleString('es', { month: 'long' });
    months.push(month);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
};

// export const getColorForStatus = (status: EventStatus): string => {
//   switch (status) {
//     case EventStatus.Created:
//       return '#4caf50';
//     case EventStatus.InDebate:
//       return '#ffeb3b';
//     case EventStatus.ReadyToPublish:
//       return '#ff9800';
//     case EventStatus.Published:
//       return '#2196f3';
//     case EventStatus.InProgress:
//       return '#3f51b5';
//     case EventStatus.Cancelled:
//       return '#f44336';
//     case EventStatus.Finished:
//       return '#9e9e9e';
//     case EventStatus.Completed:
//       return '#00bcd4';
//     default:
//       return '#000000';
//   }
// };

export const ensureDateFiltering = (
  defaultDates: string[],
  filterOptions: FilterOptions[] | undefined,
) => {
  const defaultFilter: FilterOptions = {
    field: 'finishedAt',
    type: 'between',
    value: defaultDates,
    // value: ['2024-10-19T17:00:00.000Z', '2025-11-22T17:00:00.000Z'],
  };

  const hasFinishedAtFilter = filterOptions?.some(
    (filter) => filter.field === 'finishedAt',
  );

  // const entryFilterOptions = [defaultFilter, ...(filterOptions || [])] || [
  //   defaultFilter,
  // ];

  const entryFilterOptions = hasFinishedAtFilter
    ? filterOptions || []
    : [
        { field: 'finishedAt', type: 'between', value: defaultDates },
        ...(filterOptions || []),
      ];

  return entryFilterOptions;
};
