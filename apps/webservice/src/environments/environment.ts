// eslint-disable-next-line @typescript-eslint/no-unused-vars
const packageDotJson = require('../../../../package.json');

export const environment = {
  production: false,
  name: packageDotJson.name,
  version: packageDotJson.version,
};
