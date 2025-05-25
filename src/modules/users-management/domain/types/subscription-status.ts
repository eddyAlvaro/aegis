// import { createMachine } from 'xstate';

// export enum SubscriptionState {
//   //Deprecated
//   Active = 'ACTIVE',
//   //Deprecated
//   Charged = 'CHARGED',
//   InProgress = 'IN_PROGRESS',
//   PenaltyCharged = 'PENALTY_CHARGED',
//   GuaranteeReturned = 'GUARANTEE_RETURNED',
// }

// export const subscriptionStateMachine = createMachine({
//   id: 'subscription',
//   initial: SubscriptionState.InProgress,
//   states: {
//     [SubscriptionState.InProgress]: {
//       on: {
//         CHARGE_PENALTY: SubscriptionState.PenaltyCharged,
//         RETURN_GUARANTEE: SubscriptionState.GuaranteeReturned,
//       },
//     },

//     [SubscriptionState.GuaranteeReturned]: {
//       type: 'final',
//     },
//     [SubscriptionState.PenaltyCharged]: {
//       type: 'final',
//     },
//   },
// });
