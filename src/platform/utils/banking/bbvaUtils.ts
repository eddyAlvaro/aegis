// import { DocumentType } from '@src/modules/organization-management/domain/types/document-type.enum';
// import { format } from 'date-fns';

// export class BbvaUtils {
//   static formatAmount = (amount: number): string => {
//     console.log(`formatNumberToBbva: ${amount}`);
//     return amount
//       .toFixed(2) // Asegura 2 decimales
//       .replace('.', ''); // Elimina el separador decimal
//   };

//   static formatDate(date: Date): string {
//     const formattedDate = format(date, 'yyyyMMdd'); // Convierte al formato AAAAMMDD
//     return formattedDate;
//   }

//   static toDOIType(documentType: DocumentType) {
//     switch (documentType) {
//       case DocumentType.Dni:
//         return 'L';
//       case DocumentType.Ce:
//         return 'E';
//       case DocumentType.Ruc:
//         return 'R';
//       case DocumentType.Pt:
//         return 'P';
//       default:
//         return 'M';
//     }
//   }

//   static toDocumentType(personType: string) {
//     if (personType === 'NATURAL_PERSON') return 'B';
//     else return 'F';
//   }
// }
