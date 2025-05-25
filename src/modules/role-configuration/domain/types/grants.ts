export type GrantProps = {
  id: string;
  name: string;
};

export type GrantType = 'organization' | 'platform';

export enum GrantId {
  /* Platform */
  PlatformManagement = 'PLATFORM_KPIS_MANAGEMENT',
  // PlatformUsersCanEditParticipant = 'PLATFORM_USERS_CAN_EDIT_PARTICIPANT',
  // PlatformUsersCanViewDetailParticipant = 'PLATFORM_USERS_CAN_VIEW_DETAIL_PARTICIPANT',
  // PlatformUsersManagement = 'PLATFORM_USERS_MANAGEMENT',
  // PlatformUsersCanCreate = 'PLATFORM_USERS_CAN_CREATE',
  // PlatformUsersCanReactivateParticipant = 'PLATFORM_USERS_CAN_REACTIVATE_PARTICIPANT',
  // PlatformUsersCanSuspendParticipant = 'PLATFORM_USERS_CAN_SUSPEND_PARTICIPANT',
  // PlatformUsersCanFilterParticipants = 'PLATFORM_USERS_CAN_FILTER_PARTICIPANTS',
  // PlatformOrganizationsManagement = 'PLATFORM_ORGANIZATIONS_MANAGEMENT',
  // PlatformOrganizationsCanView = 'PLATFORM_ORGANIZATIONS_CAN_VIEW',
  // PlatformOrganizationsCanCreate = 'PLATFORM_ORGANIZATIONS_CAN_CREATE',
  // PlatformOrganizationsCanAssignAdministrator = 'PLATFORM_ORGANIZATIONS_CAN_ASSIGN_ADMINISTRATOR',
  // //PlatformPaymentCanConfirm = 'PLATFORM_PAYMENT_CAN_CONFIRM',
  // PlatformPaymentCanView = 'PLATFORM_PAYMENT_CAN_VIEW',
  // PlatformPaymentComissionCanObserve = 'PLATFORM_PAYMENT_COMISSION_CAN_OBSERVE',
  // PlatformPaymentComissionCanConfirm = 'PLATFORM_PAYMENT_COMISSION_CAN_CONFIRM',
  // PlatformOrganizationsCanUpdate = 'PLATFORM_ORGANIZATIONS_CAN_UPDATE',
  // PlatformOrganizationsCanActivate = 'PLATFORM_ORGANIZATIONS_CAN_ACTIVATE',
  // PlatformOrganizationsCanSuspend = 'PLATFORM_ORGANIZATIONS_CAN_SUSPEND',
  // PlatformRolesManagement = 'PLATFORM_ROLES_MANAGEMENT',
  // PlatformRolesCanCreate = 'PLATFORM_ROLES_CAN_CREATE',
  // PlatformRolesCanDelete = 'PLATFORM_ROLES_CAN_DELETE',
  // PlatformRolesCanView = 'PLATFORM_ROLES_CAN_VIEW',
  // PlatformEventsManagement = 'PLATFORM_EVENTS_MANAGEMENT',
  // PlatformBidsManagement = 'PLATFORM_BIDS_MANAGEMENT',
  // PlatformBidsCanView = 'PLATFORM_BIDS_CAN_VIEW',
  // //PlatformFinanceCanValidateWalletRecharge = 'PLATFORM_FINANCE_CAN_VALIDATE_WALLET_RECHARGE',
  // PlatformEventsCanCancel = 'PLATFORM_EVENTS_CAN_CANCEL',
  // OrganizationRolesCanView = 'ORGANIZATION_ROLES_CAN_VIEW',
  // OrganizationBidsManagement = 'ORGANIZATION_BIDS_MANAGEMENT',
  // OrganizationBidsCanView = 'ORGANIZATION_BIDS_CAN_VIEW',
  // OrganizationBidsCanAccept = 'ORGANIZATION_BIDS_CAN_ACCEPT',
  // OrganizationBidsCanReject = 'ORGANIZATION_BIDS_CAN_REJECT',
  // PlatformEventsCanView = 'PLATFORM_EVENTS_CAN_VIEW',
  // PlatformEventsCanPublish = 'PLATFORM_EVENTS_CAN_PUBLISH',
  // PlatformOfferManagement = 'PLATFORM_OFFER_MANAGEMENT',
  // PlatformOfferCanView = 'PLATFORM_OFFER_CAN_VIEW',
  // PlatformOfferCanCreate = 'PLATFORM_OFFER_CAN_CREATE',
  // PlatformOfferCanUpdate = 'PLATFORM_OFFER_CAN_UPDATE',
  // PlatformUsersCanView = 'PLATFORM_USERS_CAN_VIEW',
  // PlatformOfferCanUpdateAppraisal = 'PLATFORM_OFFER_CAN_UPDATE_APPRAISAL',
  // PlatformUsersCanViewParticipants = 'PLATFORM_USERS_CAN_VIEW_PARTICIPANTS',
  // PlatformUsersCanViewAdministrators = 'PLATFORM_USERS_CAN_VIEW_ADMINISTRATORS',
  // PlatformUsersCanExportAdministrators = 'PLATFORM_USERS_CAN_EXPORT_ADMINISTRATORS',
  // PlatformUsersCanExportParticipants = 'PLATFORM_USERS_CAN_EXPORT_PARTICIPANTS',
  // PlatformUsersCanSuspend = 'PLATFORM_USERS_CAN_SUSPEND',
  // PlatformPaymentManagement = 'PLATFORM_PAYMENT_MANAGEMENT',
  // PlatformOfferCanRetire = 'PLATFORM_OFFER_CAN_RETIRE',
  // PlatformDeliveryCanConfirm = 'PLATFORM_TRANSFERENCE_CAN_CONFIRM',
  // PlatformTransferenceMangement = 'PLATFORM_TRANSFERENCE_MANAGEMENT',
  // /* Organization */
  // OrganizationKpisManagement = 'ORGANIZATION_KPIS_MANAGEMENT',
  // OrganizationEventsManagement = 'ORGANIZATION_EVENTS_MANAGEMENT',
  // OrganizationEventsCanCreate = 'ORGANIZATION_EVENTS_CAN_CREATE',
  // OrganizationEventsCanView = 'ORGANIZATION_EVENTS_CAN_VIEW',
  // OrganizationEventsCanEdit = 'ORGANIZATION_EVENTS_CAN_EDIT',
  // OrganizationUsersManagement = 'ORGANIZATION_USERS_MANAGEMENT',
  // //OrganizationUsersCanViewParticipants = 'ORGANIZATION_USERS_CAN_VIEW_PARTICIPANTS',
  // OrganizationUsersCanViewAdministrators = 'ORGANIZATION_USERS_CAN_VIEW_ADMINISTRATORS',
  // OrganizationUsersCanExportAdministrators = 'ORGANIZATION_USERS_CAN_EXPORT_ADMINISTRATORS',
  // OrganizationUsersCanSuspend = 'ORGANIZATION_USERS_CAN_SUSPEND',
  // OrganizationUsersCanView = 'ORGANIZATION_USERS_CAN_VIEW',
  // OrganizationUsersCanCreate = 'ORGANIZATION_USERS_CAN_CREATE',
  // OrganizationRolesManagement = 'ORGANIZATION_ROLES_MANAGEMENT',
  // OrganizationRolesCanCreate = 'ORGANIZATION_ROLES_CAN_CREATE',
  // OrganizationRolesCanDelete = 'ORGANIZATION_ROLES_CAN_DELETE',
  // OrganizationOffersCanDiscuss = 'ORGANIZATION_OFFERS_CAN_DISCUSS',
  // OrganizationTransferenceCanConfirmSupport = 'ORGANIZATION_TRANSFERENCE_CAN_CONFIRM_SUPPORT',
  // OrganizationBidManagement = 'ORGANIZATION_BID_MANAGEMENT',
  // OrganizationBidCanAccept = 'ORGANIZATION_BID_CAN_ACCEPT',
  // OrganizationBidCanReject = 'ORGANIZATION_BID_CAN_REJECT',
  // OrganizationBidCanCounterOffer = 'ORGANIZATION_BID_CAN_COUNTER_OFFER',
  // OrganizationPaymentManagement = 'ORGANIZATION_PAYMENT_MANAGEMENT',
  // OrganizationPaymentCanView = 'ORGANIZATION_PAYMENT_CAN_VIEW',
  // OrganizationPaymentPropertyCanConfirm = 'ORGANIZATION_PAYMENT_PROPERTY_CAN_CONFIRM',
  // OrganizationPaymentPropertyCanObserve = 'ORGANIZATION_PAYMENT_PROPERTY_CAN_OBSERVE',
  // OrganizationOffersCanConfirm = 'ORGANIZATION_OFFERS_CAN_CONFIRM',
  // OrganizationOffersManagement = 'ORGANIZATION_OFFERS_MANAGEMENT',
  // OrganizationOffersCanView = 'ORGANIZATION_OFFERS_CAN_VIEW',
  // OrganizationOffersCanReject = 'ORGANIZATION_OFFERS_CAN_REJECT',
  // OrganizationTransferenceManagement = 'ORGANIZATION_TRANSFERENCE_MANAGEMENT',
  // OrganizationTransferenceCanConfirm = 'ORGANIZATION_TRANSFERENCE_CAN_CONFIRM',
  // PlatformAttentionManagement = 'PLATFORM_ATTENTION_MANAGEMENT',
  // PlatformAttentionCanAuthorizeRetires = 'PLATFORM_ATTENTION_CAN_AUTHORIZE_RETIRES',
  // PlatformAttentionCanRejectRetires = 'PLATFORM_ATTENTION_CAN_REJECT_RETIRES',
  // PlatformAttentionCanViewRetireRequest = 'PLATFORM_ATTENTION_CAN_VIEW_RETIRE_REQUEST',
  // PlatformAttentionCanAuthorizeRecharges = 'PLATFORM_ATTENTION_CAN_AUTHORIZE_RECHARGES',
  // PlatformAttentionCanRejectRecharges = 'PLATFORM_ATTENTION_CAN_REJECT_RECHARGES',
  // PlatformAttentionCanViewRechargeRequest = 'PLATFORM_ATTENTION_CAN_VIEW_RECHARGE_REQUEST',
  // PlatformAttentionCanViewAccountValidation = 'PLATFORM_ATTENTION_CAN_VIEW_ACCOUNT_VALIDATION',
  // PlatformAttentionCanViewWithDrawalRequest = 'PLATFORM_ATTENTION_CAN_VIEW_WITHDRAWAL_REQUEST',
  // PlatformAttentionCanViewDisbursementLots = 'PLATFORM_ATTENTION_CAN_VIEW_DISBURSEMENT_LOTS',
  // PlatformAttentionCanConfirmDisbursementLots = 'PLATFORM_ATTENTION_CAN_CONFIRM_DISBURSEMENT_LOTS',
  // PlatformReportsManagement = 'PLATFORM_REPORTS_MANAGEMENT',
  // PlatformReportsCanViewGlobalTransactions = 'PLATFORM_REPORTS_CAN_VIEW_GLOBAL_TRANSACTIONS',
  // PlatformReportsCanViewDisbursementLots = 'PLATFORM_REPORTS_CAN_VIEW_DISBURSEMENT_LOTS',
  // PlatformReportsCanViewAccountValidations = 'PLATFORM_REPORTS_CAN_VIEW_ACCOUNT_VALIDATIONS',
  // PlatformReportsCanViewAccountBalance = 'PLATFORM_REPORTS_CAN_VIEW_ACCOUNT_BALANCE',
  // // ------------------------------
  // OrganizationSustentationManagement = 'ORGANIZATION_SUSTENTATION_MANAGEMENT',
  // OrganizationSustentationTransferenceCanEdit = 'ORGANIZATION_SUSTENTATION_TRANSFERENCE_CAN_EDIT',
  // OrganizationSustentationTransferenceCanConfirm = 'ORGANIZATION_SUSTENTATION_TRANSFERENCE_CAN_CONFIRM',
  // PlatformSustentationDeliveryCanConfirm = 'PLATFORM_SUSTENTATION_DELIVERY_CAN_CONFIRM',
  // PlatformSustentationDeliveryCanEdit = 'PLATFORM_SUSTENTATION_DELIVERY_CAN_EDIT',
  // OrganizationSustentationDeliveryCanEdit = 'ORGANIZATION_SUSTENTATION_DELIVERY_CAN_EDIT',
  // PlatformSustentationManagement = 'PLATFORM_SUSTENTATION_MANAGEMENT',
}

export const grantMap: Record<
  GrantId,
  {
    name: string;
    type: GrantType;
    module: // | 'event-management'
    // | 'organization-management'
    // | 'delivery-management'
    // | 'transference-management'
    // | 'payment-management'
    // | 'offer-management'
    // | 'role-management'
    'user-management';
    // | 'bid-management'
    // | 'finance'
    // | 'kpi-management'
    // | 'attention-management'
    // | 'sustentation-management'
    // | 'reports';
  }
> = {
  [GrantId.PlatformManagement]: {
    name: 'Gestion de plataforma',
    type: 'platform',
    module: 'user-management',
  },
  // [GrantId.PlatformUsersCanFilterParticipants]: {
  //   name: 'Puede filtrar participantes',
  //   type: 'platform',
  //   module: 'user-management',
  // },
  // [GrantId.PlatformUsersCanEditParticipant]: {
  //   name: 'Puede editar participante',
  //   type: 'platform',
  //   module: 'user-management',
  // },
  // [GrantId.PlatformUsersCanViewDetailParticipant]: {
  //   name: 'Puede ver detalle de participante',
  //   type: 'platform',
  //   module: 'user-management',
  // },
};

export const getPlatformGrantList = () =>
  Object.values(grantMap).filter((grant) => grant.type === 'platform');
export const getOrganizationGrantList = () =>
  Object.values(grantMap).filter((grant) => grant.type === 'organization');

export const getGrantIdList = (
  type: 'platform' | 'organization',
): GrantId[] => {
  return Object.keys(grantMap)
    .filter((key) => grantMap[key as GrantId].type === type) // Casting explícito a GrantId
    .map((key) => key as GrantId); // Convertir el string a GrantId
};

export const getGrantPropsList = (
  type: 'platform' | 'organization',
): {
  id: string;
  name: string;
  type: GrantType;
}[] => {
  return Object.keys(grantMap)
    .filter((key) => grantMap[key as GrantId].type === type) // Casting explícito a GrantId
    .map((key) => ({
      id: key,
      name: grantMap[key as GrantId].name,
      type: grantMap[key as GrantId].type,
      module: grantMap[key as GrantId].module,
    })); // Convertir el string a GrantId
};
