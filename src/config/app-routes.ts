/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const authManagement = 'auth-management';
const roleConfiguration = 'role-configuration';

const sharedKernel = 'shared-kernel';
// SubRoots
const car = 'car';

const driving = 'driving';

// User Types
// const participant = 'participant';
// const platform = 'platform';
// const organization = 'organization';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  sharedKernel: {
    root: sharedKernel,
    car: {
      root: car,
      getCarBrands: `/${sharedKernel}/${car}/get-car-brands`,
      getCarModels: `/${sharedKernel}/${car}/get-car-models`,
    },
  },

  roleConfiguration: {
    root: roleConfiguration,
    findRoles: `/${roleConfiguration}/find-roles`,
    findGrants: `/${roleConfiguration}/find-grants`,
    findRolesPaginated: `/${roleConfiguration}/find-roles-paginated`,
    createRole: `/${roleConfiguration}/create-role`,
    deleteRole: `/${roleConfiguration}/delete-role`,
    updateRole: `/${roleConfiguration}/update-role`,
    getRoleDetail: `/${roleConfiguration}/get-role-detail`,
  },

  driving: {
    root: driving,
    generateDrivingTrainingRecord: `/${driving}/create-driving-training-record`,
  },

  authManagement: {
    root: authManagement,
    loginUser: `/${authManagement}/login-user`,
    registerParticipant: `/${authManagement}/register-participant`,
    resendOtp: `/${authManagement}/resend-otp`,
    registerParticipantByOtp: `/${authManagement}/register-participant-by-otp`,
    reactivateParticipantAccount: `/${authManagement}/reactivate-participant-account`,
    suspendParticipantAccount: `/${authManagement}/suspend-participant-account`,
    validateOtp: `/${authManagement}/validate-otp`,
    resetUserPassword: `/${authManagement}/reset-user-password`,
    restoreUserPassword: `/${authManagement}/restore-user-password`,
    recoveryUserPassword: `/${authManagement}/recovery-user-password`,
    getMyGrants: `/${authManagement}/get-my-grants`,
    getMyInfo: `/${authManagement}/get-my-info`,
  },
};
