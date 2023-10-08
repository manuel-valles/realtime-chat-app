# RealTime Chat App
A RealTime Chat App with NestJS, Postgres, Prisma, GraphQL, React and more.

> **IMPORTANT**: This is a WIP project, so it's not finished yet <br/>
> ⚠️ Working on the service side at the moment.

## Prerequisites
- Node.js
- Docker
- NestJS CLI: 
```shell
npm i -g @nestjs/cli
```

## Full Stack Setup
### Service
**NestJS** is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, 
is built with and fully supports TypeScript and combines elements of OOP, FP, and FRP.

```shell
nest new service
```

### ViteJS
**Vite** is a build tool that provides a faster and leaner development experience for modern web projects: https://vitejs.dev/guide/

```bash
# Install Vite globally and pick the libraries, e.g. React with TypeScript
npm create vite@latest

# Install dependencies
yarn
```

### Prisma
**Prisma** is an open source next-generation ORM. It consists of the following parts:
- _Prisma Client_: Auto-generated and type-safe query builder for Node.js and TypeScript
- _Prisma Migrate_: Migration system
- _Prisma Studio_: GUI to view and edit data in your database.

Set up **Prisma**: https://docs.nestjs.com/recipes/prisma#set-up-prisma

```bash
# Add Prisma to your project
yarn add -D prisma

# Initialize Prisma
npx prisma init

# Start the database
docker-compose up -d

# Create a migration
npx prisma migrate dev --name init
```

Use it on the service: https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services

### GraphQL
**GraphQL** is a query language for APIs and a runtime for fulfilling those queries with your existing data.

Add **GraphQL** to this service: https://docs.nestjs.com/graphql/quick-start

```bash
yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql graphql-upload
```

### JWT and main configuration
https://docs.nestjs.com/security/authentication#jwt-based-authentication

```bash
yarn add @nestjs/jwt bcrypt class-validator class-transformer cookie-parser @nestjs/config && yarn add -D @types/bcrypt @types/cookie-parser @types/graphql-upload
```
> **TODO**: Add Redis to the service side https://docs.nestjs.com/microservices/redis#installation

> **NOTE**: When using Studio Sandbox, you will need to comment out the `origin: 'http://loalhost:5173'` line in `main.ts` file. <br/>
> To diagnose the problem, pleas run locally: `$npx diagnose-endpoint@1.1.0 --endpoint=http://127.0.0.1:3000/graphql`

## App
### Mantine 
**Mantine** is a fully featured React components library: https://mantine.dev/guides/vite/

```shell
yarn add @mantine/core @mantine/hooks @mantine/form @mantine/dropzone @mantine/modals
```

### GraphQL Code Generator
**GraphQL Code Generator** generates code out of your GraphQL schema: https://the-guild.dev/graphql/codegen/docs/guides/react-vue

```shell
yarn add graphql && yarn add -D typescript ts-node @graphql-codegen/cli @graphql-codegen/client-preset @parcel/watcher
```

```bash
# Generate types from GraphQL schema and operations (queries, mutations, subscriptions)
yarn graphql-codegen --watch
```

### Zustand
**Zustand** is a small, fast and scalable state-management solution.

```bash
yarn add zustand
```

### Apollo Client
**Apollo Client** is a comprehensive state management library for JavaScript that enables you to manage both local and 
remote data with GraphQL: https://www.apollographql.com/docs/react/get-started/

```bash
yarn add @apollo/client apollo-upload-client graphql-ws && yarn add -D @types/apollo-upload-client
```

