export const apiRoutes = {
  identities: {
    root: 'identities',
    signin: 'signin',
    register: 'register',
  },
  initialSetup: {
    root: 'initialSetup',
    isPermitted: 'isPermitted',
    perform: 'perform',
  },
  plans: {
    root: 'plans',
    create: 'create',
    retrieve: 'retrieve',
  },
  profiles: {
    root: 'profiles',
    retrieveMyProfile: 'retrieveMyProfile',
    retrieveAllProfiles: 'retrieveAllProfiles',
  },
  stripe: {
    root: 'stripe',
    retrieveConfiguration: 'retrieveConfiguration',
    createPaymentIntentForPlan: 'createPaymentIntentForPlan',
  },
  subscriptions: {
    root: 'subscriptions',
    subscribe: 'subscribe',
  },
  support: {
    root: 'support',
    request: 'request',
  },
  statistics: {
    root: 'statistics',
    retrieveUsersCountOverTime: 'retrieveUsersCountOverTime',
    retrieveSubscriptionsCountOverTime: 'retrieveSubscriptionsCountOverTime',
    retrieveUserCountOnCurrentMonth: 'retrieveUserCountOnCurrentMonth',
    retrieveSalesCountOverTime: 'retrieveSalesCountOverTime',
  },
};
