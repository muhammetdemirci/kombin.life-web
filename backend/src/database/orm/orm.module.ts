import { DynamicModule, Module } from '@nestjs/common';
import { Knex } from 'knex';
import { AnyModelConstructor } from 'objection';

import { ConfigProvider } from './constants/config-provider.constant';
import { ModelsProvider } from './constants/models.provider';
import { OrmService } from './services/orm.service';

@Module({})
export class OrmModule {
  static forRoot(config: Knex.Config, models: AnyModelConstructor[]): DynamicModule {
    return {
      global: true,
      module: OrmModule,
      imports: [],
      exports: [OrmService],
      providers: [
        {
          provide: ConfigProvider,
          useValue: config,
        },
        {
          provide: ModelsProvider,
          useValue: models,
        },
        OrmService,
      ],
    };
  }
}
