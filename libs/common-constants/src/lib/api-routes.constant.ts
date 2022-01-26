export const apiRoutes = {
  identities: {
    root: 'identities',
    signin: 'signin',
    register: 'register',
  },
  initialSetup: {
    root: 'initialSetup',
    isPermitted: 'isPermitted',
    initialize: 'initialize',
  },
  plans: {
    root: 'plans',
    create: 'create',
    retrieve: 'retrieve',
  },
  profiles: {
    root: 'profiles',
    retrieveMyProfile: 'retrieveMyProfile',
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
};
