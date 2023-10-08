# RealTime Chat App | Service

This is the service side of the RealTime Chat App that uses NestJS, Postgres, Prisma, GraphQL and Redis.

## Start the database
```bash
docker-compose up -d
````

If it is the first time you run the database, you need to run the migrations

```bash
npx prisma migrate dev --name init
````

## Running the service

```bash
# Development
yarn start

# Watch mode
yarn start:dev

# Production mode
yarn start:prod
```

## Test

```bash
# Unit tests
yarn test

# e2e tests
yarn test:e2e

# Test coverage
yarn test:cov
```
