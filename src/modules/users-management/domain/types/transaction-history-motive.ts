export enum TransactionHistoryMotive {
  WalletTopUp = 'WALLET_TOP_UP', //Recarga de monedero
  PenaltyDischarge = 'PENALTY_DISCHARGE', //Cobro de penalidad
  BalanceWithdraw = 'BALANCE_WITHDRAW', // Retirod de saldo
  GuaranteeSeparation = 'GUARANTEE_SEPERATION', // Separacion de garantia (Experimental)
  GuaranteeDevolution = 'GUARANTEE_DEVOLUTION', // Devolución de garantia (Experimental)
}

export const transactionHistoryMotiveRecord: Record<
  TransactionHistoryMotive,
  { label: string }
> = {
  [TransactionHistoryMotive.WalletTopUp]: {
    label: 'Recarga de monedero',
  },
  [TransactionHistoryMotive.PenaltyDischarge]: {
    label: 'Cobro de penalidad',
  },
  [TransactionHistoryMotive.BalanceWithdraw]: {
    label: 'Retiro de salgo',
  },
  [TransactionHistoryMotive.GuaranteeSeparation]: {
    label: 'Separación de garantía',
  },
  [TransactionHistoryMotive.GuaranteeDevolution]: {
    label: 'Devolución de garantía',
  },
};
