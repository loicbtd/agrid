# Agrid

## Development environment

### Prerequisites

-   Visual Studio Code Installed

-   Visual Studio Code [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension installed

-   Visual Studio Code [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension installed

-   node 16.13.1 installed

-   npm 16.13.1 installed

### Setup

1. Clone the repository

2. Open a terminal in the repository directory

3. Install dependancies by executing `npm install` and `npm run postinstall`

### Usage

#### Start the webservice and the webapp

1. Open a terminal in the repository directory and run `npm start`

### Update application version number property

1. Change the version property value in the package.json file of the repository root directory

## Troubleshooting

### Module did not self-register

> This issue comes from the electron build process at postinstall. After that, if you try to run a non-electron project, some sources may not be compiled for a non-electron project and it may crash.

1. Execute `npm rebuild`

# Technological stack

-   Language : [TypeScript](https://www.typescriptlang.org/)
-   Language framework : [Node.js](https://nodejs.org)
-   Workspace : [Nx workspace](https://nx.dev)
-   Frontend framework : [Angular](https://angular.io)
-   Angular components : [PrimeNG](https://primefaces.org/primeng/showcase)
-   CSS framework : [PrimeFlex](https://www.primefaces.org/primeflex/display)
-   Icons pack : [Font Awesome](https://fontawesome.com/v5.15/icons)
-   ORM : [TypeORM](https://typeorm.io/#/)

# Changelog

> See CHANGELOG.md file
