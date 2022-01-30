# Agrid

## Development environment

### Prerequisites

- Visual Studio Code Installed

- Visual Studio Code [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension installed

- Visual Studio Code [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension installed

- node 16.13.1 installed

- npm 8.1.2 installed

### Setup

1. Clone the repository

2. Open a terminal in the repository directory

3. Install dependancies by executing `npm install` and `npm run postinstall`

### Usage

#### Start the webservice and the webapp

1. Create a `.env` file in the root of the repository with the following content :

```conf
WEBSERVICE_ALLOWED_ORIGIN="http://localhost:4200"
WEBSERVICE_JWT_SECRET="secret"
WEBSERVICE_JWT_EXPIRATION_TIME="48h"
WEBSERVICE_HOST="localhost"
WEBSERVICE_PORT="3333"
WEBSERVICE_EMAIL_SENDER_ADDRESS="user@company.com"
WEBSERVICE_EMAIL_SENDER_NAME="user"
WEBSERVICE_EMAIL_SENDER_LOGIN="login"
WEBSERVICE_EMAIL_SENDER_PASSWORD="password",
WEBSERVICE_EMAIL_SENDER_SMTP_HOST="localhost"
WEBSERVICE_APPLICATION_NAME="App"
WEBSERVICE_DATABASE_HOST="localhost"
WEBSERVICE_DATABASE_PORT="3306"
WEBSERVICE_DATABASE_NAME="database"
WEBSERVICE_DATABASE_LOGIN="login"
WEBSERVICE_DATABASE_PASSWORD="password"
WEBSERVICE_STRIPE_SECRET_KEY="secret"
WEBSERVICE_STRIPE_PUBLISHABLE_KEY="publishable"
```

2. Open a terminal in the repository directory and run `npm start`

### Update application version number property

1. Change the version property value in the package.json file of the repository root directory

## Troubleshooting

### Module did not self-register

> This issue comes from the electron build process at postinstall. After that, if you try to run a non-electron project, some sources may not be compiled for a non-electron project and it may crash.

1. Execute `npm rebuild`

# Technological stack

- Language : [TypeScript](https://www.typescriptlang.org/)
- Language framework : [Node.js](https://nodejs.org)
- Workspace : [Nx workspace](https://nx.dev)
- Frontend framework : [Angular](https://angular.io)
- Angular components : [PrimeNG](https://primefaces.org/primeng/showcase)
- Angular state management : [NGXS](https://www.ngxs.io/)
- CSS framework : [PrimeFlex](https://www.primefaces.org/primeflex/display)
- Icons pack : [Font Awesome](https://fontawesome.com/v5.15/icons)
- ORM : [TypeORM](https://typeorm.io/#/)

# Changelog

> See CHANGELOG.md file
