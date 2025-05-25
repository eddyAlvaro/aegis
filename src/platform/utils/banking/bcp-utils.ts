// import { AccountType } from '@src/modules/finance/domain/entities/account-type';
// import { Currency } from '@src/modules/users-management/domain/types/currency';
// import { format } from 'date-fns';

// export class BcpUtils {
//   static formatAcountType = (accountType: AccountType): string => {
//     switch (accountType) {
//       case AccountType.Savings:
//         return 'A';
//       case AccountType.CurrentAccount:
//         return 'C';
//       case AccountType.MasterAccount:
//         return 'M';
//     }
//   };

//   static formatCurrency = (currency: Currency) => {
//     switch (currency) {
//       case Currency.USD:
//         return '1001';
//     }
//   };

//   static formatAmount = (amount: number): string => {
//     console.log(`formatNumberToBcp: ${amount}`);
//     return amount.toFixed(2); // Asegura 2 decimales
//   };

//   static formatDate(date: Date): string {
//     const formattedDate = format(date, 'yyyyMMdd'); // Convierte al formato AAAAMMDD
//     return formattedDate;
//   }
// }
