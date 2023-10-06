# RealTime Chat App
A RealTime Chat App with NestJS, Postgres, Prisma, GraphQL, React and more.

# Prerequisites
- Node.js
- Docker
- NestJS CLI: `$ npm i -g @nestjs/cli`

# Full Stack Setup
- Service: `nest new service`
- ViteJS: `npm create vite@latest` (React + TypeScript)
- Prisma: 
  - https://docs.nestjs.com/recipes/prisma#set-up-prisma
  - `$ yarn add -D prisma`
  - `$ npx prisma init`
  - `$ docker-compose up -d`
  - `$ npx prisma migrate dev --name init`
  - https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services