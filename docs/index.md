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
    "database": "database",
    "username": "username",
    "password": "password",
    "entities": ["libs/common-entities/src/lib/*.entity.ts"],
    "migrations": ["migrations/*.ts"],
    "cli": {
      "migrationsDir": "migrations",
      "entitiesDir": "libs/common-entities/src/lib"
    }
  }
]
```

### Generate the migration after the model has changed

Execute `npm run typeorm migration:generate -- -n <MigrationName>`

### Create a new empty migration

Execute `npm run typeorm migration:create -- -n <MigrationName>`

### Run migrations

Execute `npm run typeorm migration:run`

### Revert the last migration

Execute `npm run typeorm migration:revert`

## Stripe integration and testing

1. Navigate to [Webhook settings](https://dashboard.stripe.com/webhooks) on your Stripe Dashboard

2. Click on "Test in a local environment" and follow the instructions to listen and send webhook events through the Stripe CLI

> ⚠️ Please note that you need to adapt some elements ⚠️
>
> 1. Change the forward-to port and route according your API when you execute the Stripe CLI command
> 2. Retrieve the webhook signin secret `whesc_*` returned by the forward-to command
> 3. Put the secret in the `WEBSERVICE_STRIPE_WEBHOOK_SECRET` environment variable of the .env file before launching the webservice
> 4. Launch the webservice
