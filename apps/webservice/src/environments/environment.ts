// eslint-disable-next-line @typescript-eslint/no-unused-vars
const packageDotJson = require('../../../../package.json');

export const environment = {
  production: false,
  allowedOrigin: process.env.WEBSERVICE_ALLOWED_ORIGIN || '*',
  jwtSecret: process.env.WEBSERVICE_JWT_SECRET || 'secret',
  jwtExpirationTime: process.env.WEBSERVICE_JWT_EXPIRATION_TIME || '48h',
  schema: process.env.WEBSERVICE_SCHEMA || 'http',
  host: process.env.WEBSERVICE_HOST || 'localhost',
  port: Number(process.env.WEBSERVICE_PORT) || 3333,
  webserviceName: `${packageDotJson.name
    .charAt(0)
    .toUpperCase()}${packageDotJson.name.slice(1).split('-').join(' ')} Api`,
  version: 'local',
  emailSenderAddress: process.env.WEBSERVICE_EMAIL_SENDER_ADDRESS || '',
  emailSenderName: process.env.WEBSERVICE_EMAIL_SENDER_NAME || '',
  emailSenderLogin: process.env.WEBSERVICE_EMAIL_SENDER_LOGIN || '',
  emailSenderPassword: process.env.WEBSERVICE_EMAIL_SENDER_PASSWORD || '',
  emailSenderSmtpHost: process.env.WEBSERVICE_EMAIL_SENDER_SMTP_HOST || '',
  emailSenderSmtpPort:
    Number(process.env.WEBSERVICE_EMAIL_SENDER_SMTP_PORT) || 465,
  applicationName: process.env.WEBSERVICE_APPLICATION_NAME || '',
  databaseHost: process.env.WEBSERVICE_DATABASE_HOST || '',
  databasePort: Number(process.env.WEBSERVICE_DATABASE_PORT) || 3306,
  databaseName: process.env.WEBSERVICE_DATABASE_NAME || '',
  databaseLogin: process.env.WEBSERVICE_DATABASE_LOGIN || '',
  databasePassword: process.env.WEBSERVICE_DATABASE_PASSWORD || '',
  stripeSecretKey: process.env.WEBSERVICE_STRIPE_SECRET_KEY || '',
  stripePublishableKey: process.env.WEBSERVICE_STRIPE_PUBLISHABLE_KEY || '',
};
