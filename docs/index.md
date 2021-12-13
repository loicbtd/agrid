# Agrid Documentation

## Issue handling workflow

Steps to handle an issue :

1. Create a new branch named `issue/{issue number}-{issue description}
2. Implement, commit and push to the issue branch you have previously created
3. Create a pull request and link the issue to it
4. Manage to get the pull request reviewed and completed by another developer

## Database migrations

### Prerequisites

1. Create a `ormconfig.json` file in the root of the repository

2. Fill it with the following content :

```json
[
  {
    "name": "default",
    "type": "postgres",
    "host": "host",
    "port": 5432,
    "username": "username",
    "password": "password",
    "database": "database",
    "entities": ["libs/common-entities/src/lib/*.entity.ts"],
    "migrations": ["migration/*.ts"],
    "cli": {
      "migrationsDir": "migration",
      "entitiesDir": "libs/common-entities/src/lib"
    }
  }
]
```

### Generate migration after the model has changed

Execute `npm run typeorm migration:generate -- -n <MigrationName>`

### Create a new empty migration

Execute `npm run typeorm migration:create -- -n <MigrationName>`

### Create a new empty migration

Execute `npm run typeorm migration:create -- -n <MigrationName>`

### Run a migration

Execute `npm run typeorm migration:run`

### Revert a migration

Execute `npm run typeorm migration:revert

## Update github pages

After you have had new or modified existing documentation to the `docs/`, execute the following command to update the online page :

```shell
git commit -m 'rebuild pages' --allow-empty
git push <remote name> <branch name>
```
