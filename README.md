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
```shell
nest new service
```

### ViteJS
```shell
npm create vite@latest
```
(React + TypeScript)
```shell
yarn
```

### Prisma 
https://docs.nestjs.com/recipes/prisma#set-up-prisma
```shell
yarn add -D prisma
```
```shell
npx prisma init
```
```shell
docker-compose up -d
```
```shell
npx prisma migrate dev --name init
```

https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services

### GraphQL
https://docs.nestjs.com/graphql/quick-start
```shell
yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql graphql-upload
```

### JWT and main configuration
https://docs.nestjs.com/security/authentication#jwt-based-authentication
```shell
yarn add @nestjs/jwt bcrypt class-validator class-transformer cookie-parser @nestjs/config
```
```shell
yarn add -D @types/bcrypt @types/cookie-parser @types/graphql-upload
```

> NOTE: When using Studio Sandbox, you will need to comment out the `origin: 'http://loalhost:5173'` line in `main.ts` file. <br/>
> To diagnose the problem, pleas run locally: `$npx diagnose-endpoint@1.1.0 --endpoint=http://127.0.0.1:3000/graphql`

## App
### Mantine 
**Mantine** is a fully featured React components library: https://mantine.dev/guides/vite/

```shell
yarn add @mantine/core @mantine/hooks @mantine/form @mantine/dropzone @mantine/modals
```

### GraphQL Code Generator
https://the-guild.dev/graphql/codegen/docs/guides/react-vue

```shell
yarn add graphql && yarn add -D typescript ts-node @graphql-codegen/cli @graphql-codegen/client-preset @parcel/watcher
```

```shell
yarn graphql-codegen --watch
```

### Zustand
**Zustand** is a small, fast and scalable state-management solution.

```shell
yarn add zustand
```

### Apollo Client
**Apollo Client** is a comprehensive state management library for JavaScript that enables you to manage both local and 
remote data with GraphQL: https://www.apollographql.com/docs/react/get-started/

```shell
yarn add @apollo/client apollo-upload-client graphql-ws && yarn add -D @types/apollo-upload-client
```