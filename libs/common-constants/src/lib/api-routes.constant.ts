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
    updateMyProfile: 'updateMyProfile',
  },
  stripe: {
    root: 'stripe',
    retrieveConfiguration: 'retrieveConfiguration',
    createPaymentIntentForPlan: 'createPaymentIntentForPlan',
    listenWebhook: 'listenWebhook',
  },
  subscriptions: {
    root: 'subscriptions',
    initiateSubscription: 'initiateSubscription',
    retrieveMySubscriptions: 'retrieveMySubscriptions',
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
