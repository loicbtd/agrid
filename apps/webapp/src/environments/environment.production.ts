// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageDotJson = require('../../../../package.json');

export const environment = {
  production: true,
  webappName: `${packageDotJson.name
    .charAt(0)
    .toUpperCase()}${packageDotJson.name.slice(1).split('-').join(' ')}`,
  version: packageDotJson.version,
};