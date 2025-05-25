// import { parse } from 'date-fns';
// import { toZonedTime, format } from 'date-fns-tz';
// import Holidays from 'date-holidays';

// const hd = new Holidays('PE');

// const addBusinessDays = (startDate: Date, daysToAdd: number) => {
//   const currentDate = new Date(startDate);
//   let addedDays = 0;

//   while (addedDays < daysToAdd) {
//     currentDate.setDate(currentDate.getDate() + 1);
//     const dayOfWeek = currentDate.getDay();
//     const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Domingo o Sábado
//     const isHoliday = hd.isHoliday(currentDate); // Verifica si es feriado

//     if (!isWeekend && !isHoliday) {
//       addedDays++;
//     }
//   }

//   return currentDate;
// };

// export const isClosingDateExceedingBusinessDays = (
//   startDate: Date,
//   endDate: Date,
//   maxBusinessDays: number,
// ) => {
//   const closingDate = addBusinessDays(new Date(startDate), maxBusinessDays);
//   return new Date(endDate) > closingDate;
// };

// export const isStartDateTooEarly = (startDate: Date) => {
//   const currentDate = new Date();
//   const twoBusinessDaysFromNow = addBusinessDays(currentDate, 2);
//   return new Date(startDate) < twoBusinessDaysFromNow;
// };

// export const simpleStringToPeruDate = (dateString: string): Date => {
//   const timeZone = 'America/Lima';
//   const dateWithoutTime = parse(dateString, 'yyyy-MM-dd', new Date());
//   const formattedDate = format(dateWithoutTime, "yyyy-MM-dd'T'00:00:00XXX", {
//     timeZone,
//   });
//   const date = toZonedTime(formattedDate, timeZone);
//   return date;
// };
