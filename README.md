# RealTime Chat App
A RealTime Chat App with NestJS, Postgres, Prisma, GraphQL, React and more.

## Prerequisites
- Node.js
- Docker
- NestJS CLI: `$ npm i -g @nestjs/cli`

## Full Stack Setup
- **Service**: `nest new service`
- **ViteJS**: `npm create vite@latest` (React + TypeScript)
- **Prisma**: 
  - https://docs.nestjs.com/recipes/prisma#set-up-prisma
  - `$ yarn add -D prisma`
  - `$ npx prisma init`
  - `$ docker-compose up -d`
  - `$ npx prisma migrate dev --name init`
  - https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services
- **GraphQL**:
  - https://docs.nestjs.com/graphql/quick-start
  - `$ yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql graphql-upload`
- **JWT** and main configuration:
  - `$ yarn add @nestjs/jwt bcrypt class-validator class-transformer cookie-parser @nestjs/config`
  - `$ yarn add -D @types/bcrypt @types/cookie-parser @types/graphql-upload`

## Auth
- https://docs.nestjs.com/security/authentication#jwt-based-authentication

> IMPORTANT: This is a WIP project, so it's not finished yet!! <br/>
> Working on the service side at the moment.