export const apiRoutes = {
  identities: {
    root: 'identities',
    signin: 'signin',
    register: 'register',
  },
  plans: {
    root: 'root',
    create: 'create',
    retrieve: 'create',
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
