export enum TransactionHistoryStatus {
  Authorized = 'AUTHORIZED',
  Rejected = 'REJECTED',
  Pending = 'PENDING',
}

export const transactionHistoryStatusRecord: Record<
  TransactionHistoryStatus,
  { label: string }
> = {
  [TransactionHistoryStatus.Authorized]: {
    label: 'Autorizado',
  },
  [TransactionHistoryStatus.Rejected]: {
    label: 'Rechazado',
  },
  [TransactionHistoryStatus.Pending]: {
    label: 'Pendiente',
  },
};
