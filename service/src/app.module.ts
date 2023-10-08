import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TokenService } from './token/token.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule, AppModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (tokenService: TokenService) => ({
        context: ({ req, res }) => ({ req, res }),
        installSubscriptionHandlers: true,
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        subscriptions: { 'graphql-ws': true },
        onConnect: ({ token }) => {
          if (!token) {
            throw new Error('Token was not provided');
          }

          const user = tokenService.validateToken(token);
          if (!user) {
            throw new Error('Invalid token');
          }

          return { user };
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
