import { UserType } from '@src/modules/users-management/domain/types/user-type';

export enum AuditableEvent {
  BidCounterOfferMade = 'BID_COUNTER_OFFER_MADE',
  BidCounterOfferAccepted = 'BID_COUNTER_OFFER_ACCEPTED',
  BidCounterOfferRejected = 'BID_COUNTER_OFFER_REJECTED',
  BidAmountUpdated = 'BID_AMOUNT_UPDATED',
  BidAccepted = 'BID_ACCEPTED',
  BidRejected = 'BID_REJECTED',
  BidCreated = 'BID_CREATED',
  BidCancelled = 'BID_CANCELLED',
  BidDiscarded = 'BID_DISCARDED',
  BidReserved = 'BID_RESERVED',
}

export type AuditableEventBidCounterOfferMade = {
  event: AuditableEvent.BidCounterOfferMade;
  payload: {
    bidCurrentAmount: number;
    bidRequestedAmount: number;
  };
};

export type AuditableEventBidCounterOfferAccepted = {
  event: AuditableEvent.BidCounterOfferAccepted;
  payload: {};
};

export type AuditableEventBidCounterOfferRejected = {
  event: AuditableEvent.BidCounterOfferRejected;
  payload: {};
};

export type AuditableEventBidAmountUpdated = {
  event: AuditableEvent.BidAmountUpdated;
  payload: {};
};

export enum BidRejectedMotive {
  Expiration = 'EXPIRATION',
  Unknown = 'UNKNOWN',
  Manual = 'MANUAL',
  ExpirationRetryToNext = 'EXPIRATION_RETRY_TO_NEXT',
}

export enum BidCancelledMotive {
  Expiration = 'EXPIRATION',
}

export type AuditableEventBidCancelled = {
  event: AuditableEvent.BidCancelled;
  payload: {
    motive: BidCancelledMotive;
  };
};

export type AuditableEventBidCreated = {
  event: AuditableEvent.BidCreated;
  payload: {};
};

export type AuditableEventBidRejected = {
  event: AuditableEvent.BidRejected;
  payload: {
    motive: BidRejectedMotive;
  };
};

export type AuditableEventBidAccepted = {
  event: AuditableEvent.BidAccepted;
  payload: {};
};
export type AuditableEventBidDiscarded = {
  event: AuditableEvent.BidDiscarded;
  payload: {};
};

export type AuditableEventBidReserved = {
  event: AuditableEvent.BidReserved;
  payload: {};
};

export type AuditableEventSealed =
  | AuditableEventBidCounterOfferMade
  | AuditableEventBidCounterOfferAccepted
  | AuditableEventBidCounterOfferRejected
  | AuditableEventBidAccepted
  | AuditableEventBidCreated
  | AuditableEventBidDiscarded
  | AuditableEventBidAmountUpdated
  | AuditableEventBidReserved
  | AuditableEventBidCancelled
  | AuditableEventBidRejected;

export enum ExecutorSource {
  User = 'USER',
  System = 'SYSTEM',
}

export type ExecutorSourceUser = {
  source: ExecutorSource.User;
  id: string;
  commonName: string;
  type: UserType;
};

export type ExecutorSourceSystem = {
  source: ExecutorSource.System;
};

export type ExecutorSourceSealed = ExecutorSourceUser | ExecutorSourceSystem;

export type ExecutorUser = {
  source: ExecutorSource.User;
  id: string;
};

export type ExecutorSystem = {
  source: ExecutorSource.System;
};

export type ExecutorSimpleSealed = ExecutorUser | ExecutorSystem;
