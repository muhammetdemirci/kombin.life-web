import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidation } from './library/utils/config-validation';
import { OrmModule } from './database/orm/orm.module';
import { Client } from './database/orm/enums/client.enum';

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
            process.env.NODE_ENV === 'testing'
              ? process.env.DATABASE_TEST_URL
              : process.env.DATABASE_URL,
          timezone: 'utc',
          ssl: ['development', 'testing'].includes(process.env.NODE_ENV)
            ? false
            : { rejectUnauthorized: false },
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
