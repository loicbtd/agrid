// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageDotJson = require('../../../../package.json');

export const environment = {
  production: false,
  webappName: `${packageDotJson.name
    .charAt(0)
    .toUpperCase()}${packageDotJson.name.slice(1).split('-').join(' ')}`,
  version: packageDotJson.version,
  webserviceOrigin: 'http://localhost:3333',
  chatwootBaseUrl: 'https://support.agrid.ml',
  chatwootEnvironmentToken: 'Baejovc9Be5SUa3URiHwP7WE',
};
