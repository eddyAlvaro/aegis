export enum TransactionHistoryType {
  Charge = 'CHARGE',
  Discharge = 'DISCHARGE',
}

export const transactionHistoryTypeRecord: Record<
  TransactionHistoryType,
  { label: string }
> = {
  [TransactionHistoryType.Charge]: {
    label: 'Ingreso',
  },
  [TransactionHistoryType.Discharge]: {
    label: 'Egreso',
  },
};
