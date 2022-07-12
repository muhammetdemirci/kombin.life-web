import { join } from 'path';

import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApolloServerPluginUsageReportingDisabled } from 'apollo-server-core/dist/plugin/usageReporting';
import Bull from 'bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Client } from './database/orm/enums/client.enum';
import { OrmModule } from './database/orm/orm.module';
import { LibraryModule } from './library/library.module';
import { mapGraphqlFormatError } from './library/mappers/graphql-format-error.mapper';
import { RedirectSslMiddleware } from './library/middlewares/redirect-ssl.middleware';
import { ComplexityPlugin } from './library/plugins/complexity.plugin';
import { RedisService } from './library/services/redis.service';
import { configValidation } from './library/utils/config-validation';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidation,
      validationOptions: {
        allowUnknown: true,
      },
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'storage', 'public'),
      serveRoot: process.env.SERVER_STORAGE || '/static',
    }),
    OrmModule.forRoot(
      {
        client: Client.POSTGRES,
        connection: {
          connectionString:
            process.env.NODE_ENV === 'testing' ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL,
          timezone: 'utc',
          ssl: ['development', 'testing'].includes(process.env.NODE_ENV) ? false : { rejectUnauthorized: false },
        },
        pool: {
          min: Number(process.env.DATABASE_MIN_CONNECTION_POOL) || 2,
          max: Number(process.env.DATABASE_MAX_CONNECTION_POOL) || 10,
        },
        // debug: true,
      },
      [
        // TODO add tables
      ],
    ),
    GraphQLModule.forRootAsync({
      useFactory: async () => {
        return {
          context: (params) => {
            const { req, res, connection } = params;
            return { req, res, connection };
          },
          cors: {
            credentials: true,
          },
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          plugins: [ApolloServerPluginUsageReportingDisabled()],
          formatError: mapGraphqlFormatError,
          sortSchema: true,
          debug: true,
          playground: true,
          fieldResolverEnhancers: ['guards'],
          installSubscriptionHandlers: true,
          uploads: false,
          introspection: true,
          subscriptions: {
            keepAlive: 50000, // send keepAlive every 50 seconds (see heroku H15 - Idle connection for more)
          },
        };
      },
    }),
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [LibraryModule],
      inject: [RedisService],
      useFactory: (redisService: RedisService) => {
        const options: Bull.QueueOptions = {
          redis: redisService.client.options,
          limiter: {
            max: 5,
            duration: 5000,
            bounceBack: true,
          },
          defaultJobOptions: {
            removeOnComplete: 1024,
            removeOnFail: 1024,
          },
        };
        return options;
      },
    }),
    UserModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    ComplexityPlugin,
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RedirectSslMiddleware).forRoutes('/*');
  }
}
